import { Container } from '@/components/ui/container';

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-bg-700/70 py-10">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-medium">Cameron Falck</div>
            <div className="mt-1 text-xs text-fg-300">George, Western Cape · Full-Stack Developer</div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <a className="text-fg-200 hover:text-fg-100" href="/projects">
              Projects
            </a>
            <a className="text-fg-200 hover:text-fg-100" href="/blog">
              Blog
            </a>
            <a className="text-fg-200 hover:text-fg-100" href="/#skills">
              Skills
            </a>
            <a className="text-fg-200 hover:text-fg-100" href="/#contact">
              Contact
            </a>
            <a className="text-fg-200 hover:text-fg-100" href="https://github.com/Nibsi3">
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-6 text-xs text-fg-300">
          Web design &amp; development in George, Western Cape. Serving the Garden Route including Wilderness, Knysna, Mossel Bay, Plettenberg Bay, and Oudtshoorn.
        </div>
        <div className="mt-2 text-xs text-fg-400">© {year} Pixaloom. All rights reserved.</div>
      </Container>
    </footer>
  );
}
