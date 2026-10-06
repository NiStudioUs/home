import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';
import 'topbar.dart';
import 'footer.dart';
import 'progress_bar.dart';
import '../design_tokens.dart';
import '../../utils/scroll_keys.dart';
import '../../utils/url_helper.dart';

class MainLayout extends StatefulWidget {
  final Widget child;

  const MainLayout({super.key, required this.child});

  @override
  State<MainLayout> createState() => _MainLayoutState();
}

class _MainLayoutState extends State<MainLayout> {
  double _scrollProgress = 0.0;
  bool _mobileMenuOpen = false;

  void _toggleMobileMenu() {
    setState(() {
      _mobileMenuOpen = !_mobileMenuOpen;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // The page content needs to provide its own scrolling, and we listen to it.
          NotificationListener<ScrollNotification>(
            onNotification: (notification) {
              if (notification.metrics.axis == Axis.vertical) {
                final maxScroll = notification.metrics.maxScrollExtent;
                final currentScroll = notification.metrics.pixels;
                if (maxScroll > 0) {
                  setState(() {
                    _scrollProgress = currentScroll / maxScroll;
                  });
                }
              }
              return false; // allow bubbling
            },
            child: widget.child,
          ),
          
          // Floating Top Navigation Bar
          Positioned(
            top: 0,
            left: 0,
            right: 0,
            child: Topbar(onBurgerTap: _toggleMobileMenu),
          ),
          
          // Reading Progress Bar
          Positioned(
            top: 0,
            left: 0,
            right: 0,
            child: ProgressBar(progress: _scrollProgress),
          ),

          // Mobile Menu Panel (simple implementation for now)
          if (_mobileMenuOpen && NiTokens.isMobile(context))
            Positioned(
              top: NiTokens.topbarHeight,
              left: 0,
              right: 0,
              child: _MobileNavPanel(onClose: _toggleMobileMenu),
            ),
        ],
      ),
    );
  }
}

class _MobileNavPanel extends StatelessWidget {
  final VoidCallback onClose;
  const _MobileNavPanel({required this.onClose});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    return Container(
      color: tokens.bg,
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          _MobileNavLink(
            title: 'Apps',
            onTap: () {
              onClose();
              if (AppScrollKeys.appsKey.currentContext != null) {
                Scrollable.ensureVisible(AppScrollKeys.appsKey.currentContext!, duration: const Duration(milliseconds: 500), curve: Curves.easeInOut);
              } else {
                context.go('/#apps');
              }
            },
          ),
          _MobileNavLink(
            title: 'Learning',
            onTap: () {
              onClose();
              if (AppScrollKeys.learningKey.currentContext != null) {
                Scrollable.ensureVisible(AppScrollKeys.learningKey.currentContext!, duration: const Duration(milliseconds: 500), curve: Curves.easeInOut);
              } else {
                context.go('/#learning');
              }
            },
          ),
          _MobileNavLink(
            title: 'Profile',
            onTap: () {
              onClose();
              context.go('/profile');
            },
          ),
          _MobileNavLink(
            title: 'Contact',
            onTap: () {
              onClose();
              if (AppScrollKeys.contactKey.currentContext != null) {
                Scrollable.ensureVisible(AppScrollKeys.contactKey.currentContext!, duration: const Duration(milliseconds: 500), curve: Curves.easeInOut);
              } else {
                context.go('/#contact');
              }
            },
          ),
          const SizedBox(height: 16),
          ListTile(
            title: Text('Close Menu', style: NiType.nav(context).copyWith(color: tokens.accent)),
            onTap: onClose,
          ),
        ],
      ),
    );
  }
}

class _MobileNavLink extends StatelessWidget {
  final String title;
  final VoidCallback onTap;
  const _MobileNavLink({required this.title, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    return ListTile(
      title: Text(title, style: NiType.nav(context).copyWith(color: tokens.text)),
      onTap: onTap,
    );
  }
}
