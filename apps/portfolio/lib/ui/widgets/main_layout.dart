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
      body: Stack(
        children: [
          // Body content
          Positioned.fill(child: child),
          
          // Floating Top Navigation Bar
          const Positioned(
            top: 0,
            left: 0,
            right: 0,
            child: NavBar(),
          ),
        ],
      ),
    );
  }
}
