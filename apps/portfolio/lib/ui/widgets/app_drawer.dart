import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../models/data_model.dart';

class AppDrawer extends StatelessWidget {
  const AppDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    final dataModel = Provider.of<DataModel>(context);

    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          DrawerHeader(
            decoration: BoxDecoration(color: Theme.of(context).primaryColor),
            child: Center(
              child: Text(
                dataModel.developer.name,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
          ListTile(
            leading: const Icon(Icons.home),
            title: const Text('Home'),
            onTap: () {
              context.go('/');
              Navigator.pop(context);
            },
          ),
          ExpansionTile(
            leading: const Icon(Icons.apps),
            title: const Text('Apps'),
            children: dataModel.apps.map((app) {
              return ListTile(
                title: Text(app.name),
                onTap: () {
                  context.go('/app/${app.id}');
                  Navigator.pop(context);
                },
                contentPadding: const EdgeInsets.only(left: 32.0),
              );
            }).toList(),
          ),
          ListTile(
            leading: const Icon(Icons.help),
            title: const Text('How to'),
            onTap: () {
              context.go('/howto');
              Navigator.pop(context);
            },
          ),
          ExpansionTile(
            leading: const Icon(Icons.policy),
            title: const Text('Legal'),
            children: dataModel.apps.map((app) {
              return Column(
                children: [
                  ListTile(
                    title: Text('${app.name} Privacy'),
                    onTap: () {
                      context.go('/app/${app.id}/privacy');
                      Navigator.pop(context);
                    },
                    contentPadding: const EdgeInsets.only(left: 32.0),
                  ),
                  ListTile(
                    title: Text('${app.name} Terms'),
                    onTap: () {
                      context.go('/app/${app.id}/terms');
                      Navigator.pop(context);
                    },
                    contentPadding: const EdgeInsets.only(left: 32.0),
                  ),
                ],
              );
            }).toList(),
          ),
        ],
      ),
    );
  }
}
