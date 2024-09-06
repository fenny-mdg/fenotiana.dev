'use client';

import {LucideIcon} from 'lucide-react';

import {cn} from '@/lib/utils.ts';
import {buttonVariants} from './button.tsx';
import {Tooltip, TooltipContent, TooltipTrigger} from './tooltip.tsx';
import {Link} from '@remix-run/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion.tsx';

export type NavItemVariant = 'default' | 'ghost';

type Menu = {
  title: string;
  label?: string;
  icon: LucideIcon;
  variant: NavItemVariant;
  route?: string;
  links?: Menu[];
};

export type NavProps = {
  isCollapsed: boolean;
  links: Menu[];
};

function NestedMenu({menu}: {menu: Menu}) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={menu.title}>
        <AccordionTrigger className=" hover:no-underline px-3 text-sm">
          <div className="flex gap-4 items-center">
            <menu.icon className="h-4 w-4" />
            <p> {menu.title}</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col px-3">
          {menu.links?.map(l => (
            <Link
              key={l.route}
              to={l.route!}
              className={cn(
                buttonVariants({variant: l.variant, size: 'sm'}),
                l.variant === 'default' &&
                  'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                'justify-start',
              )}
            >
              <l.icon className="mr-4 h-4 w-4" />
              {l.title}
              {l.label ? (
                <span
                  className={cn(
                    'ml-auto',
                    l.variant === 'default' &&
                      'text-background dark:text-white',
                  )}
                >
                  {l.label}
                </span>
              ) : null}
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function NavContainer({children}: {children: React.ReactNode}) {
  return (
    <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
      {children}
    </nav>
  );
}

function CollapsedNav({links}: {links: Menu[]}) {
  return (
    <NavContainer>
      {links.map(link => (
        <Tooltip key={link.route} delayDuration={0}>
          <TooltipTrigger asChild>
            <Link
              // todo: Handle nested links with collapsed nav
              to={link.route || ''}
              className={cn(
                buttonVariants({variant: link.variant, size: 'icon'}),
                'h-9 w-9',
                link.variant === 'default' &&
                  'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
              )}
              prefetch="viewport"
            >
              <link.icon className="h-4 w-4" />
              <span className="sr-only">{link.title}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-4">
            {link.title}
            {link.label ? (
              <span className="ml-auto text-muted-foreground">
                {link.label}
              </span>
            ) : null}
          </TooltipContent>
        </Tooltip>
      ))}
    </NavContainer>
  );
}

export function Nav({links, isCollapsed}: NavProps) {
  if (isCollapsed) {
    return <CollapsedNav links={links} />;
  }

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map(link => {
          const isNested = link.links?.length && !link.route;
          return isNested ? (
            <NestedMenu key={link.title} menu={link} />
          ) : (
            <Link
              key={link.route}
              to={link.route as string}
              className={cn(
                buttonVariants({variant: link.variant, size: 'sm'}),
                link.variant === 'default' &&
                  'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                'justify-start',
              )}
            >
              <link.icon className="mr-4 h-4 w-4" />
              {link.title}
              {link.label ? (
                <span
                  className={cn(
                    'ml-auto',
                    link.variant === 'default' &&
                      'text-background dark:text-white',
                  )}
                >
                  {link.label}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
