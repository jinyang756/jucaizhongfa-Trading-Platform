import * as React from "react";
import { Table as TableTheme } from "@radix-ui/themes";

import { cn } from "../../lib/utils";

const Table = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof TableTheme.Root>
>(({ className, ...props }, ref) => (
  <TableTheme.Root
    ref={ref}
    className={cn("w-full", className)}
    {...props}
  />
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentPropsWithoutRef<typeof TableTheme.Header>
>(({ className, ...props }, ref) => (
  <TableTheme.Header
    ref={ref}
    className={cn("[&_tr]:border-b", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentPropsWithoutRef<typeof TableTheme.Body>
>(({ className, ...props }, ref) => (
  <TableTheme.Body
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.ComponentPropsWithoutRef<typeof TableTheme.Row>
>(({ className, ...props }, ref) => (
  <TableTheme.Row
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ComponentPropsWithoutRef<typeof TableTheme.ColumnHeaderCell>
>(({ className, ...props }, ref) => (
  <TableTheme.ColumnHeaderCell
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.ComponentPropsWithoutRef<typeof TableTheme.Cell>
>(({ className, ...props }, ref) => (
  <TableTheme.Cell
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

export {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
};