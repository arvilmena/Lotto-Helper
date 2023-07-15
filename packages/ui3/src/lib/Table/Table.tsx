import React from 'react';

export const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <table className="table-fixed border-collapse border border-slate-400 w-full">
      <tbody>{children}</tbody>
    </table>
  );
};
export const Th = ({
  children,
  colSpan = 1,
  textAlign = 'text-left',
}: {
  children: React.ReactNode;
  colSpan?: number;
  textAlign?: 'text-left' | 'text-center' | 'text-right';
}) => {
  return (
    <th
      colSpan={colSpan}
      className={`${textAlign}} px-3 border border-slate-300 text-base`}
    >
      {children}
    </th>
  );
};

export const Td = ({
  children,
  textSize = 'text-lg',
  colSpan = 2,
}: {
  children: React.ReactNode;
  textSize?: 'text-xl' | 'text-lg';
  colSpan?: number;
}) => {
  return (
    <td
      colSpan={colSpan}
      className={`text-center border border-slate-300 font-bold ${textSize}`}
    >
      {children}
    </td>
  );
};
