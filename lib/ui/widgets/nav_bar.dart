import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart'; // Import provider
import '../../models/data_model.dart';
import '../../services/theme_service.dart'; // Import ThemeService
import '../../services/current_app_service.dart';
import '../widgets/image_helper.dart';

class NavBar extends StatelessWidget {
  const NavBar({super.key});

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth > 700) {
          return const _DesktopNavBar();
        } else {
          return const _MobileNavBar();
        }
      },
    );
  }
}

class _DesktopNavBar extends StatelessWidget {
  const _DesktopNavBar();

  @override
  Widget build(BuildContext context) {
    final dataModel = Provider.of<DataModel>(context);
    final themeService = Provider.of<ThemeService>(context);
    final currentAppService = Provider.of<CurrentAppService>(
      context,
    ); // Listen to current app
    final currentApp = currentAppService.currentApp;

    List<AppFeature> featuresToShow = [];
    if (currentApp != null) {
      if (currentAppService.pageType == PageType.app) {
        featuresToShow = currentApp.features;
      } else if (currentAppService.pageType == PageType.privacy) {
        featuresToShow = currentApp.privacyPolicy.features;
      } else if (currentAppService.pageType == PageType.terms) {
        featuresToShow = currentApp.termsAndConditions.features;
      }
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
      decoration: BoxDecoration(
        color: Theme.of(context).cardColor,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: [
          // Brand / Logo
          InkWell(
            onTap: () => context.go('/'),
            child: Text(
              dataModel.developer.name,
              style: Theme.of(
                context,
              ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
            ),
          ),

          // Breadcrumb
          if (currentApp != null) ...[
            const SizedBox(width: 8),
            Icon(
              Icons.chevron_right,
              size: 20,
              color: Theme.of(
                context,
              ).colorScheme.onSurface.withValues(alpha: 0.5),
            ),
            const SizedBox(width: 8),
            InkWell(
              onTap: () {
                currentAppService.scrollToTop();
              },
              child: Row(
                children: [
                  if (currentApp.iconUrl.isNotEmpty) ...[
                    // Tiny icon
                    Container(
                      width: 20,
                      height: 20,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(4),
                        image: DecorationImage(
                          image: getImageProvider(currentApp.iconUrl),
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                  ],
                  Text(
                    currentApp.name,
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                ],
              ),
            ),
          ],

          const Spacer(),

          // Features/Links Dropdown (Dynamic)
          if (featuresToShow.isNotEmpty) ...[
            MenuAnchor(
              builder: (context, controller, child) {
                return TextButton(
                  onPressed: () {
                    if (controller.isOpen) {
                      controller.close();
                    } else {
                      controller.open();
                    }
                  },
                  child: Row(
                    children: [
                      Text(
                        currentAppService.pageType == PageType.app
                            ? 'Features'
                            : 'On this page',
                      ),
                      const Icon(Icons.arrow_drop_down),
                    ],
                  ),
                );
              },
              menuChildren: featuresToShow.where((f) => f.hide != true).map((
                feature,
              ) {
                return MenuItemButton(
                  onPressed: () =>
                      currentAppService.navigateToFeature(feature.title),
                  child: Text(feature.title),
                );
              }).toList(),
            ),
            const SizedBox(width: 20),
          ],

          // Apps Dropdown
          if (currentApp == null) ...[
            _AppsDropdown(apps: dataModel.apps),
            const SizedBox(width: 20),
          ],

          // How To
          TextButton(
            onPressed: () => context.go('/howto'),
            child: const Text('How to'),
          ),
          const SizedBox(width: 20),

          // Legal Dropdown
          _LegalDropdown(apps: dataModel.apps),
          const SizedBox(width: 20),

          // Theme Toggle
          IconButton(
            icon: Icon(
              themeService.isDarkMode ? Icons.light_mode : Icons.dark_mode,
            ),
            onPressed: () {
              themeService.toggleTheme();
            },
          ),
        ],
      ),
    );
  }
}

class _MobileNavBar extends StatelessWidget {
  const _MobileNavBar();

  @override
  Widget build(BuildContext context) {
    final dataModel = Provider.of<DataModel>(context);
    final themeService = Provider.of<ThemeService>(context);

    return AppBar(
      title: InkWell(
        onTap: () => context.go('/'),
        child: Row(
          children: [
            Text(
              dataModel.developer.name,
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
          ],
        ),
      ),
      actions: [
        IconButton(
          icon: Icon(
            themeService.isDarkMode ? Icons.light_mode : Icons.dark_mode,
          ),
          onPressed: () {
            themeService.toggleTheme();
          },
        ),
        Builder(
          builder: (context) => IconButton(
            icon: const Icon(Icons.menu),
            onPressed: () {
              Scaffold.of(context).openEndDrawer();
            },
          ),
        ),
      ],
    );
  }
}

class _AppsDropdown extends StatelessWidget {
  final List<AppModel> apps;
  const _AppsDropdown({required this.apps});

  @override
  Widget build(BuildContext context) {
    return MenuAnchor(
      builder: (context, controller, child) {
        return TextButton(
          onPressed: () {
            if (controller.isOpen) {
              controller.close();
            } else {
              controller.open();
            }
          },
          child: const Row(
            children: [Text('Apps'), Icon(Icons.arrow_drop_down)],
          ),
        );
      },
      menuChildren: apps.map((app) {
        return MenuItemButton(
          onPressed: () => context.go('/app/${app.id}'),
          child: Text(app.name),
        );
      }).toList(),
    );
  }
}

class _LegalDropdown extends StatelessWidget {
  final List<AppModel> apps;
  const _LegalDropdown({required this.apps});

  @override
  Widget build(BuildContext context) {
    return MenuAnchor(
      builder: (context, controller, child) {
        return TextButton(
          onPressed: () {
            if (controller.isOpen) {
              controller.close();
            } else {
              controller.open();
            }
          },
          child: const Row(
            children: [Text('Legal'), Icon(Icons.arrow_drop_down)],
          ),
        );
      },
      menuChildren: apps.map((app) {
        return SubmenuButton(
          menuChildren: [
            MenuItemButton(
              onPressed: () => context.go('/app/${app.id}/privacy'),
              child: const Text('Privacy Policy'),
            ),
            MenuItemButton(
              onPressed: () => context.go('/app/${app.id}/terms'),
              child: const Text('Terms & Conditions'),
            ),
          ],
          child: Text(app.name),
        );
      }).toList(),
    );
  }
}
