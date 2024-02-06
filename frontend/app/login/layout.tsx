import { Container } from '@mantine/core';

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <div>
        {children}
      </div>
    )
  }