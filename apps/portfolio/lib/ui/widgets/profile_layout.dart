import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:ni_design_system/ni_design_system.dart';
import '../../utils/easter_egg.dart';
import '../../services/theme_service.dart';

class ProfileTopbar extends StatelessWidget implements PreferredSizeWidget {
  const ProfileTopbar({super.key});

  @override
  Size get preferredSize => const Size.fromHeight(NiTokens.topbarHeight);

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final themeService = Provider.of<ThemeService>(context, listen: false);
    final bool isMobile = NiTokens.isMobile(context);
    
    return Container(
      height: preferredSize.height,
      decoration: BoxDecoration(
        color: tokens.bg.withOpacity(0.8),
        border: Border(bottom: BorderSide(color: tokens.border)),
      ),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: NiTokens.gutter),
            child: Row(
              children: [
                // Brand Name
                MouseRegion(
                  cursor: SystemMouseCursors.click,
                  child: GestureDetector(
                    onTap: () {
                      if (EasterEgg.handle('home')) {
                        context.go('/');
                      } else {
                        context.go('/');
                      }
                    },
                    child: Row(
                      children: [
                        Icon(Icons.home_outlined, color: tokens.text, size: 20),
                        const SizedBox(width: 8),
                        Text(
                          'Ni Studio Us',
                          style: NiType.brand(context).copyWith(color: tokens.text),
                        ),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 12.0),
                          child: Text('|', style: NiType.brand(context).copyWith(color: tokens.border)),
                        ),
                        Text(
                          'Karthik Subramanian',
                          style: NiType.brand(context).copyWith(
                            color: tokens.text.withOpacity(0.8),
                            fontWeight: FontWeight.normal,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const Spacer(),
                
                // Links (Desktop)
                if (!isMobile) ...[
                  _ProfileNavLink(title: 'Experience', route: '/profile/timeline'),
                  const SizedBox(width: 4),
                  _ProfileNavLink(title: 'Story', route: '/profile/story'),
                  const SizedBox(width: 4),
                  _ProfileNavLink(title: 'Projects', route: '/profile/projects'),
                  const SizedBox(width: 4),
                  _ProfileNavLink(title: 'Tech Stack', route: '/profile/stack'),
                  const SizedBox(width: 8),
                ],
                
                // Theme toggle
                IconButton(
                  icon: Icon(tokens.isDark ? Icons.light_mode : Icons.dark_mode, color: tokens.text, size: 20),
                  onPressed: () {
                    if (EasterEgg.handle('theme')) {
                      context.go('/profile/timeline');
                    } else {
                      themeService.toggleTheme();
                    }
                  },
                ),

                // Mobile Menu Trigger
                if (isMobile) ...[
                  const SizedBox(width: 8),
                  IconButton(
                    icon: Icon(Icons.menu, color: tokens.text),
                    onPressed: () {
                      // TODO: Implement mobile menu drawer for profile if needed
                    },
                  ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _ProfileNavLink extends StatelessWidget {
  final String title;
  final String route;
  const _ProfileNavLink({required this.title, required this.route});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final String currentRoute = GoRouterState.of(context).uri.toString();
    final bool isActive = currentRoute == route;
    
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () => context.go(route),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
          decoration: BoxDecoration(
            color: isActive ? tokens.surface : Colors.transparent,
            borderRadius: BorderRadius.circular(NiTokens.rMenu),
          ),
          child: Text(
            title,
            style: isActive ? NiType.body(context) : NiType.muted(context),
          ),
        ),
      ),
    );
  }
}

class ProfileLayout extends StatelessWidget {
  final Widget child;
  const ProfileLayout({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    return Scaffold(
      backgroundColor: tokens.bg,
      appBar: const ProfileTopbar(),
      body: child,
    );
  }
}
