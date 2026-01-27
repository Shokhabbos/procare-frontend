import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@shared/lib';

/**
 * Daraxtli ma'lumot strukturasi (cheksiz chuqurlik)
 */
export type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
};

/**
 * Props for NestedDropdownSelector
 */
export type NestedDropdownSelectorProps = {
  data: TreeNode[];
  value?: string;
  onChange?: (node: TreeNode, path: TreeNode[]) => void;
  placeholder?: string;
  className?: string;
};

/**
 * ASOSIY KOMPONENT: Modal ichida input, dropdown tashqarida
 */
export function NestedDropdownSelector({
  data,
  value,
  onChange,
  placeholder = 'Qurilmani tanlang',
  className,
}: NestedDropdownSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>(() => value ?? '');
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);
  const inputRef = useRef<HTMLButtonElement>(null);

  const handleSelect = (node: TreeNode, path: TreeNode[]) => {
    setSelectedLabel(path.map((n) => n.label).join(' > '));
    setIsOpen(false);
    setTriggerEl(null);
    onChange?.(node, path);
  };

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
      setTriggerEl(null);
    } else {
      const el = inputRef.current;
      if (el) {
        setTriggerEl(el);
        setIsOpen(true);
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTriggerEl(null);
  };

  return (
    <>
      {/* Input tugmasi - modal ichida */}
      <button
        ref={inputRef}
        type="button"
        onClick={handleToggle}
        className={cn(
          'w-full px-3 py-2 text-left border border-black-200 rounded-lg',
          'bg-white hover:bg-black-50 transition-colors',
          'text-14-regular text-body',
          'focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent',
          className,
        )}
      >
        <span className={selectedLabel ? 'text-body' : 'text-description'}>
          {selectedLabel || placeholder}
        </span>
      </button>

      {/* Dropdown - modal tashqarisida (portal orqali) */}
      {isOpen && triggerEl && (
        <DropdownPortal
          data={data}
          onSelect={handleSelect}
          onClose={handleClose}
          triggerElement={triggerEl}
        />
      )}
    </>
  );
}

/**
 * DROPDOWN PORTAL: Modal tashqarisida render qilish
 */
type DropdownPortalProps = {
  data: TreeNode[];
  onSelect: (node: TreeNode, path: TreeNode[]) => void;
  onClose: () => void;
  triggerElement: HTMLElement;
};

function DropdownPortal({
  data,
  onSelect,
  onClose,
  triggerElement,
}: DropdownPortalProps) {
  const [activePath, setActivePath] = useState<TreeNode[]>([]);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dropdown pozitsiyasini hisoblash (modal pastidan boshlanadi)
  useEffect(() => {
    const calculatePosition = () => {
      const triggerRect = triggerElement.getBoundingClientRect();

      // Birinchi panel input ostida
      setPosition({
        top: triggerRect.bottom + 8,
        left: triggerRect.left,
      });
    };

    calculatePosition();
    window.addEventListener('resize', calculatePosition);
    window.addEventListener('scroll', calculatePosition);

    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition);
    };
  }, [triggerElement]);

  // Tashqarida bosish - yopish
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        !triggerElement.contains(target)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, triggerElement]);

  const handleItemClick = (node: TreeNode, depth: number) => {
    if (node.children && node.children.length > 0) {
      // Yangi path yaratish
      const newPath = [...activePath.slice(0, depth), node];
      setActivePath(newPath);
    } else {
      // Leaf node - tanlash
      const fullPath = [...activePath.slice(0, depth), node];
      onSelect(node, fullPath);
    }
  };

  const handleItemHover = (node: TreeNode, depth: number) => {
    if (node.children && node.children.length > 0) {
      const newPath = [...activePath.slice(0, depth), node];
      setActivePath(newPath);
    }
  };

  return createPortal(
    <div
      ref={dropdownRef}
      className="fixed z-[9999] flex gap-2"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {/* Birinchi panel - root data (input ostida) */}
      <DropdownPanel
        nodes={data}
        onItemClick={(node) => handleItemClick(node, 0)}
        onItemHover={(node) => handleItemHover(node, 0)}
        activeNodeId={activePath[0]?.id}
      />

      {/* Nested panellar (o'ng tomonga) */}
      {activePath.map((pathNode, index) => {
        if (pathNode.children && pathNode.children.length > 0) {
          return (
            <DropdownPanel
              key={pathNode.id + index}
              nodes={pathNode.children}
              onItemClick={(node) => handleItemClick(node, index + 1)}
              onItemHover={(node) => handleItemHover(node, index + 1)}
              activeNodeId={activePath[index + 1]?.id}
            />
          );
        }
        return null;
      })}
    </div>,
    document.body,
  );
}

/**
 * DROPDOWN PANEL: Har bir level uchun panel
 */
type DropdownPanelProps = {
  nodes: TreeNode[];
  onItemClick: (node: TreeNode) => void;
  onItemHover: (node: TreeNode) => void;
  activeNodeId?: string;
};

function DropdownPanel({
  nodes,
  onItemClick,
  onItemHover,
  activeNodeId,
}: DropdownPanelProps) {
  // 5ta element uchun max height (har biri ~42px)
  return (
    <div className="w-[220px] bg-white rounded-lg shadow-xl border border-black-200 overflow-hidden">
      <style>
        {`
          .dropdown-scroll::-webkit-scrollbar {
            width: 6px;
          }
          .dropdown-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .dropdown-scroll::-webkit-scrollbar-thumb {
            background: #E5E7EB;
            border-radius: 3px;
          }
          .dropdown-scroll::-webkit-scrollbar-thumb:hover {
            background: #D1D5DB;
          }
        `}
      </style>
      <div
        className="dropdown-scroll max-h-[210px] overflow-y-auto py-2"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#E5E7EB transparent',
        }}
      >
        {nodes.map((node) => (
          <DropdownItem
            key={node.id}
            node={node}
            isActive={activeNodeId === node.id}
            onClick={() => onItemClick(node)}
            onHover={() => onItemHover(node)}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * DROPDOWN ITEM: Har bir element
 */
type DropdownItemProps = {
  node: TreeNode;
  isActive: boolean;
  onClick: () => void;
  onHover: () => void;
};

function DropdownItem({ node, isActive, onClick, onHover }: DropdownItemProps) {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onHover}
      className={cn(
        'w-full px-4 py-2.5 flex items-center justify-between',
        'text-14-regular text-body text-left',
        'transition-colors duration-150',
        'hover:bg-black-50',
        isActive && 'bg-black-50',
      )}
    >
      <span className="flex-1">{node.label}</span>
      {hasChildren && (
        <ChevronRight
          size={16}
          className="text-description ml-2 flex-shrink-0"
        />
      )}
    </button>
  );
}
