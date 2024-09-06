import {
  GaugeCircle,
  Megaphone,
  Contact,
  Plus,
  Send,
  LogOut,
} from 'lucide-react';

import {Nav, NavItemVariant, NavProps} from '@/components/ui/nav.tsx';
import {LoaderFunctionArgs} from '@remix-run/node';
import {
  Link,
  MetaFunction,
  Outlet,
  useLoaderData,
  useLocation,
} from '@remix-run/react';
import {useState} from 'react';
import {requireUserId} from '~/utils/auth.server.ts';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable.tsx';
import {cn} from '@/lib/utils.ts';
import {toNameCase, useSelectedMenu} from '~/utils/misc.tsx';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx';
import {TooltipProvider} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {getUser} from '~/utils/user.server';
import LogoutForm from '@/components/ui/logout-form';

export const loader = async ({request}: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const user = await getUser(userId);
  const {id, email, username} = user!;

  return {user: {id, email, username}};
};

export const meta: MetaFunction = ({location}) => {
  const {pathname} = location;
  const [, currentPath] = pathname.split('/').filter(Boolean);

  return [
    {
      title: toNameCase(currentPath),
    },
  ];
};

export default function AppLayout() {
  const {user} = useLoaderData<typeof loader>();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const selectedMenu = useSelectedMenu();
  const sidebarMenus: NavProps['links'] = [
    {
      title: 'Dashboard',
      icon: GaugeCircle,
      variant: 'default',
      route: 'dashboard',
    },
    {
      title: 'Campain',
      icon: Megaphone,
      variant: 'default',
      links: [
        {
          title: 'Créer campagne',
          route: 'campain/new',
          icon: Plus,
          variant: 'default',
        },
        {
          title: 'Toutes les campagnes',
          route: 'campain/list',
          variant: 'default',
          icon: Megaphone,
        },
        {
          title: 'Expéditeur personnalisé',
          route: 'campain/custom-sender',
          variant: 'default',
          icon: Send,
        },
      ],
    },
    {
      title: 'Contacts',
      icon: Contact,
      variant: 'default',
      links: [
        {
          title: 'Tous les contacts',
          route: 'contacts',
          icon: Contact,
          variant: 'default',
        },
        {
          title: 'Groupes',
          route: 'contacts/groups',
          icon: Contact,
          variant: 'default',
        },
      ],
    },
  ].map(menu => {
    const [, ...routes] = selectedMenu.split('/').filter(Boolean);
    const route = routes.join('/');

    return {
      ...menu,
      variant: (route === menu?.route ? 'default' : 'ghost') as NavItemVariant,
      links: menu.links?.map(l => ({
        ...l,
        variant: (route === l.route ? 'default' : 'ghost') as NavItemVariant,
      })),
    };
  }) as NavProps['links'];
  const {pathname} = useLocation();
  const [app, ...pathNames] = pathname.split('/').filter(Boolean);

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-screen">
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(
              sizes,
            )}`;
          }}
          className="h-full items-stretch"
        >
          <ResizablePanel
            defaultSize={255}
            collapsedSize={4}
            collapsible={true}
            minSize={15}
            maxSize={20}
            onExpand={() => {
              setIsCollapsed(false);
            }}
            onCollapse={() => {
              setIsCollapsed(true);
            }}
            className={cn(
              isCollapsed &&
                'min-w-[50px] transition-all duration-300 ease-in-out',
              'relative',
            )}
          >
            <div className="flex my-8 justify-center">
              {/* <Logo /> */}
              Logo
            </div>
            <Nav isCollapsed={isCollapsed} links={sidebarMenus} />

            <div className="absolute bottom-0 w-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex w-full py-6 justify-start"
                  >
                    <Avatar className="mr-2">
                      <AvatarFallback>
                        {user.username?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <span className="text-xs overflow-hidden">
                      {user.email}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem>
                    <Link to="#">Mon compte</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Button type="submit" form="logout-form" variant="ghost">
                      <LogOut className="mr-2" />
                      <span>Se déconnecter</span>
                    </Button>
                    <LogoutForm logoutRoute="/logout" formId="logout-form">
                      ok
                    </LogoutForm>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />

          <ResizablePanel style={{overflow: 'auto'}}>
            <div className="p-8 h-screen flex flex-col">
              <div className="text-xl mb-8">
                <Breadcrumb>
                  <BreadcrumbList>
                    {pathNames.map((path, index, self) => (
                      <>
                        <BreadcrumbItem key={path}>
                          <BreadcrumbLink
                            href={`/${app}/${self
                              .slice(0, index + 1)
                              .join('/')}`}
                          >
                            {toNameCase(path)}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        {index === pathNames.length - 1 ? null : (
                          <BreadcrumbSeparator />
                        )}
                      </>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="flex-1">
                <Outlet />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </TooltipProvider>
  );
}
