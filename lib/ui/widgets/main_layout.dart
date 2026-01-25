import 'package:flutter/material.dart';
import 'nav_bar.dart';
import 'app_drawer.dart';

class MainLayout extends StatelessWidget {
  final Widget child;

  const MainLayout({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      endDrawer: const AppDrawer(),
      body: Column(
        children: [
          const NavBar(),
          Expanded(child: child),
        ],
      ),
    );
  }
}
