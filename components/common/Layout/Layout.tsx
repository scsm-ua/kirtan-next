import './Layout.scss';
import Header from '@/components/common/Header/Header';

/**
 *
 */
function Layout({
  children,
  className,
  footer
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  footer: React.ReactNode
}>) {
  const cls = className ? 'Main ' + className : 'Main';

  return (
    <html lang="en">
      <body>
        <div className="Layout">
          <div className="Layout__content">
            <Header />
            <main className="Main">{children}</main>
          </div>

          {footer}
        </div>
      </body>
    </html>
  );
}

/**/
export default Layout
