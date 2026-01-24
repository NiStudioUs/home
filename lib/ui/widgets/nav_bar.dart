import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart'; // Import provider
import 'package:url_launcher/url_launcher.dart'; // Import url_launcher
import '../../models/data_model.dart';
import '../../services/theme_service.dart'; // Import ThemeService

class NavBar extends StatelessWidget {
  const NavBar({super.key});

  @override
  Widget build(BuildContext context) {
    final dataModel = Provider.of<DataModel>(context);
    final themeService = Provider.of<ThemeService>(context);

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
      decoration: BoxDecoration(
        color: Theme.of(context).cardColor,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
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
          const Spacer(),

          // Desktop Navigation (For now assuming desktop-first as it is a website)
          // We can add responsive check later.

          // Apps Dropdown
          _AppsDropdown(apps: dataModel.apps),
          const SizedBox(width: 20),

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
              onPressed: () => _launchAdUrl(app.privacyPolicyUrl),
              child: const Text('Privacy Policy'),
            ),
            MenuItemButton(
              onPressed: () => _launchAdUrl(app.termsUrl),
              child: const Text('Terms & Conditions'),
            ),
          ],
          child: Text(app.name),
        );
      }).toList(),
    );
  }

  Future<void> _launchAdUrl(String url) async {
    final uri = Uri.parse(url);
    if (!await launchUrl(uri)) {
      throw Exception('Could not launch $url');
    }
  }
}
