import 'package:flutter/material.dart';
import '../theme/ni_tokens.dart';

class NiStickySectionData {
  final String id;
  final String title;
  final String subtitle;
  final Widget content;

  NiStickySectionData({
    required this.id,
    required this.title,
    required this.subtitle,
    required this.content,
  });
}

class NiStickySidebarLayout extends StatefulWidget {
  final Widget? header;
  final Widget? headerSidebar;
  final Widget? footerSidebar;
  final List<NiStickySectionData> sections;

  const NiStickySidebarLayout({
    super.key,
    this.header,
    this.headerSidebar,
    this.footerSidebar,
    required this.sections,
  });

  @override
  State<NiStickySidebarLayout> createState() => _NiStickySidebarLayoutState();
}

class _NiStickySidebarLayoutState extends State<NiStickySidebarLayout> {
  final ScrollController _scrollController = ScrollController();
  final List<GlobalKey> _sectionKeys = [];
  int _activeIndex = 0;

  @override
  void initState() {
    super.initState();
    for (var i = 0; i < widget.sections.length; i++) {
      _sectionKeys.add(GlobalKey());
    }
    _scrollController.addListener(_onScroll);
  }

  @override
  void dispose() {
    _scrollController.removeListener(_onScroll);
    _scrollController.dispose();
    super.dispose();
  }

  void _onScroll() {
    if (!_scrollController.hasClients) return;
    
    // Check if at the very bottom
    if (_scrollController.position.pixels >= _scrollController.position.maxScrollExtent - 10) {
      if (_activeIndex != _sectionKeys.length - 1) {
        setState(() {
          _activeIndex = _sectionKeys.length - 1;
        });
      }
      return;
    }

    // Check if at the very top
    if (_scrollController.offset <= 10) {
      if (_activeIndex != 0) {
        setState(() {
          _activeIndex = 0;
        });
      }
      return;
    }

    int newIndex = _activeIndex;

    for (int i = 0; i < _sectionKeys.length; i++) {
      final key = _sectionKeys[i];
      final currentContext = key.currentContext;
      if (currentContext != null) {
        final box = currentContext.findRenderObject() as RenderBox;
        final position = box.localToGlobal(Offset.zero);
        
        // Find the last section whose top is above the middle of the screen
        final threshold = MediaQuery.of(context).size.height / 2;
        if (position.dy <= threshold) {
          newIndex = i;
        }
      }
    }

    if (_scrollController.hasClients && _scrollController.position.pixels >= _scrollController.position.maxScrollExtent - 20) {
      newIndex = _sectionKeys.length - 1;
    }

    if (newIndex != _activeIndex) {
      setState(() {
        _activeIndex = newIndex;
      });
    }
  }

  void _scrollToSection(int index) {
    final key = _sectionKeys[index];
    final currentContext = key.currentContext;
    if (currentContext != null) {
      Scrollable.ensureVisible(
        currentContext,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
        alignment: 0.1, // Near the top
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final isMobile = NiTokens.isMobile(context);
    final tokens = NiTokens.of(context);

    if (isMobile) {
      return SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (widget.header != null) widget.header!,
            if (widget.headerSidebar != null) widget.headerSidebar!,
            const SizedBox(height: 32),
            ...widget.sections.map((s) => Padding(
              padding: const EdgeInsets.only(bottom: 32.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(s.title, style: NiType.h3(context)),
                  Text(s.subtitle, style: NiType.muted(context)),
                  const SizedBox(height: 16),
                  s.content,
                ],
              ),
            )),
            if (widget.footerSidebar != null) ...[
              const SizedBox(height: 32),
              widget.footerSidebar!
            ]
          ],
        ),
      );
    }

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Fixed Sidebar
        SizedBox(
          width: 250,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (widget.headerSidebar != null) widget.headerSidebar!,
              const SizedBox(height: 32),
              Flexible(
                child: ListView.builder(
                  shrinkWrap: true,
                  itemCount: widget.sections.length,
                  itemBuilder: (context, index) {
                    final section = widget.sections[index];
                    final isActive = _activeIndex == index;
                    return MouseRegion(
                      cursor: SystemMouseCursors.click,
                      child: GestureDetector(
                        onTap: () => _scrollToSection(index),
                        child: Container(
                          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
                          decoration: BoxDecoration(
                            border: Border(
                              left: BorderSide(
                                color: isActive ? tokens.accent : Colors.transparent,
                                width: 3,
                              ),
                            ),
                            color: isActive ? tokens.surface : Colors.transparent,
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                section.title,
                                style: NiType.body(context).copyWith(
                                  fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
                                  color: isActive ? tokens.text : tokens.text.withOpacity(0.6),
                                ),
                              ),
                              if (section.subtitle.isNotEmpty) ...[
                                const SizedBox(height: 4),
                                Text(
                                  section.subtitle,
                                  style: NiType.eyebrow(context).copyWith(
                                    color: isActive ? tokens.text.withOpacity(0.8) : tokens.text.withOpacity(0.5),
                                  ),
                                ),
                              ]
                            ],
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
              if (widget.footerSidebar != null) ...[
                const SizedBox(height: 32),
                widget.footerSidebar!
              ]
            ],
          ),
        ),
        const SizedBox(width: 48),
        // Scrolling Content
        Expanded(
          child: SingleChildScrollView(
            controller: _scrollController,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: List.generate(widget.sections.length, (index) {
                final section = widget.sections[index];
                return Container(
                  key: _sectionKeys[index],
                  margin: const EdgeInsets.only(bottom: 64.0),
                  child: section.content,
                );
              }),
            ),
          ),
        ),
      ],
    );
  }
}
