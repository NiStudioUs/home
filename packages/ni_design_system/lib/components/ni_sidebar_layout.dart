import 'package:flutter/material.dart';
import '../theme/ni_tokens.dart';

class NiSidebarLayout extends StatelessWidget {
  final Widget sidebar;
  final Widget content;

  const NiSidebarLayout({
    super.key,
    required this.sidebar,
    required this.content,
  });

  @override
  Widget build(BuildContext context) {
    final isMobile = NiTokens.isMobile(context);

    if (isMobile) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          sidebar,
          const SizedBox(height: 32),
          content,
        ],
      );
    }

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          width: 280,
          child: StickySidebar(child: sidebar),
        ),
        const SizedBox(width: 48),
        Expanded(child: content),
      ],
    );
  }
}

class StickySidebar extends StatefulWidget {
  final Widget child;
  const StickySidebar({super.key, required this.child});

  @override
  State<StickySidebar> createState() => _StickySidebarState();
}

class _StickySidebarState extends State<StickySidebar> {
  // A basic sticky behavior could be implemented with slivers,
  // but for a simpler layout we just wrap in a sticky-like container.
  @override
  Widget build(BuildContext context) {
    // Top padding matches typical header heights + breathing room
    return Container(
      constraints: BoxConstraints(
        minHeight: MediaQuery.sizeOf(context).height - 200,
      ),
      child: widget.child,
    );
  }
}
