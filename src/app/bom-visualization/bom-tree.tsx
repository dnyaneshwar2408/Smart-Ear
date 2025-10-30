"use client";

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Search, Package, Layers } from 'lucide-react';

interface BomNode {
  id: string;
  name: string;
  quantity: number;
  children: BomNode[];
}

interface BomTreeProps {
  data: BomNode;
}

interface BomNodeItemProps {
  node: BomNode;
  filter: string;
}

function BomNodeItem({ node, filter }: BomNodeItemProps) {
  const hasChildren = node.children && node.children.length > 0;
  
  const filteredChildren = useMemo(() => {
    if (!filter) return node.children;
    const lowercasedFilter = filter.toLowerCase();
    
    const filterNodes = (nodes: BomNode[]): BomNode[] => {
      return nodes.reduce((acc, child) => {
        const childMatches = child.name.toLowerCase().includes(lowercasedFilter) || child.id.toLowerCase().includes(lowercasedFilter);
        const descendants = filterNodes(child.children);
        if (childMatches || descendants.length > 0) {
          acc.push({ ...child, children: descendants });
        }
        return acc;
      }, [] as BomNode[]);
    };

    return filterNodes(node.children);
  }, [node.children, filter]);

  const itemContent = (
    <div className="flex items-center gap-4">
      {hasChildren ? <Layers className="h-4 w-4 text-primary" /> : <Package className="h-4 w-4 text-muted-foreground" />}
      <span className="font-medium">{node.name}</span>
      <span className="text-xs text-muted-foreground">{node.id}</span>
      <Badge variant="secondary" className="ml-auto">Qty: {node.quantity}</Badge>
    </div>
  );

  if (hasChildren) {
    return (
      <AccordionItem value={node.id}>
        <AccordionTrigger>{itemContent}</AccordionTrigger>
        <AccordionContent>
          <div className="pl-6 border-l ml-6">
            <Accordion type="multiple" className="w-full">
              {filteredChildren.map((child) => (
                <BomNodeItem key={child.id} node={child} filter={filter} />
              ))}
            </Accordion>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <div className="flex items-center p-4">
      {itemContent}
    </div>
  );
}


export function BomTree({ data }: BomTreeProps) {
  const [filter, setFilter] = useState('');

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search components by name or ID..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="border rounded-lg">
        <Accordion type="multiple" className="w-full" defaultValue={[data.id]}>
          <BomNodeItem node={data} filter={filter} />
        </Accordion>
      </div>
    </div>
  );
}
