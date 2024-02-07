// eslint-disable-next-line import/order
import '@mantine/core/styles.css';

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <div>
      {children}
    </div>
  );
}
