import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../utils/scroll_keys.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../design_tokens.dart';
import '../../services/theme_service.dart';
import '../../services/data_service.dart';
import '../../models/data_model.dart';
import 'package:url_launcher/url_launcher.dart';

class Topbar extends StatefulWidget {
  final VoidCallback onBurgerTap;

  const Topbar({super.key, required this.onBurgerTap});

  @override
  State<Topbar> createState() => _TopbarState();
}

class _TopbarState extends State<Topbar> {
  String? _openDropdown; // 'Features' or 'Legal' or null
  final LayerLink _featuresLink = LayerLink();
  final LayerLink _legalLink = LayerLink();
  OverlayEntry? _overlayEntry;

  void _toggleDropdown(String name, LayerLink link) {
    if (_openDropdown == name) {
      _closeDropdown();
    } else {
      _openDropdown = name;
      _showDropdown(link, name);
    }
  }

  void _closeDropdown() {
    _overlayEntry?.remove();
    _overlayEntry = null;
    setState(() {
      _openDropdown = null;
    });
  }

  void _showDropdown(LayerLink link, String name) {
    _overlayEntry?.remove();

    _overlayEntry = OverlayEntry(
      builder: (context) {
        return Stack(
          children: [
            GestureDetector(
              behavior: HitTestBehavior.opaque,
              onTap: _closeDropdown,
              child: Container(color: Colors.transparent),
            ),
            Positioned(
              width: name == 'Features' ? 560 : 250,
              child: CompositedTransformFollower(
                link: link,
                showWhenUnlinked: false,
                offset: const Offset(0, 48), // 8px under trigger (trigger is ~40px)
                targetAnchor: Alignment.bottomRight,
                followerAnchor: Alignment.topRight,
                child: Material(
                  color: Colors.transparent,
                  child: name == 'Features' 
                      ? _FeaturesDropdownPanel(onClose: _closeDropdown)
                      : _LegalDropdownPanel(onClose: _closeDropdown),
                ),
              ),
            ),
          ],
        );
      },
    );

    Overlay.of(context).insert(_overlayEntry!);
    setState(() {});
  }

  @override
  void dispose() {
    _overlayEntry?.remove();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final isMobile = NiTokens.isMobile(context);

    return ClipRect(
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 14, sigmaY: 14),
        child: Container(
          height: NiTokens.topbarHeight,
          decoration: BoxDecoration(
            color: tokens.bg.withOpacity(0.78),
            border: Border(bottom: BorderSide(color: tokens.border, width: 1)),
          ),
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: NiTokens.gutter),
                child: Row(
                  children: [
                    // Brand
                    MouseRegion(
                      cursor: SystemMouseCursors.click,
                      child: GestureDetector(
                        onTap: () {
                          _closeDropdown();
                          context.go('/');
                        },
                        child: Row(
                          children: [
                            ClipRRect(
                              borderRadius: BorderRadius.circular(NiTokens.rBrandImg),
                              child: Image.asset(
                                'assets/developers/dev-avatar.png', // Will update to actual asset or placeholder logic later
                                width: 30,
                                height: 30,
                                errorBuilder: (c, e, s) => Container(
                                  width: 30,
                                  height: 30,
                                  color: tokens.accent,
                                  child: const Center(child: Text('N', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold))),
                                ),
                              ),
                            ),
                            const SizedBox(width: 12),
                            Text('Ni Studio Us', style: NiType.brand(context).copyWith(color: tokens.text)),
                          ],
                        ),
                      ),
                    ),
                    const Spacer(),
                    
                    // Nav (Desktop)
                    if (!isMobile) ...[
                      _NavLink(title: 'Apps', onTap: () { 
                        _closeDropdown(); 
                        if (AppScrollKeys.appsKey.currentContext != null) {
                          Scrollable.ensureVisible(AppScrollKeys.appsKey.currentContext!, duration: const Duration(milliseconds: 500), curve: Curves.easeInOut);
                        } else {
                          context.go('/#apps'); 
                        }
                      }),
                      const SizedBox(width: 4),
                      _NavLink(title: 'Learning', onTap: () { 
                        _closeDropdown(); 
                        if (AppScrollKeys.learningKey.currentContext != null) {
                          Scrollable.ensureVisible(AppScrollKeys.learningKey.currentContext!, duration: const Duration(milliseconds: 500), curve: Curves.easeInOut);
                        } else {
                          context.go('/#learning'); 
                        }
                      }),
                      const SizedBox(width: 4),
                      _NavLink(title: 'Contact', onTap: () { 
                        _closeDropdown(); 
                        if (AppScrollKeys.contactKey.currentContext != null) {
                          Scrollable.ensureVisible(AppScrollKeys.contactKey.currentContext!, duration: const Duration(milliseconds: 500), curve: Curves.easeInOut);
                        } else {
                          context.go('/#contact'); 
                        }
                      }),
                      const SizedBox(width: 4),
                      
                      CompositedTransformTarget(
                        link: _featuresLink,
                        child: _NavDropdownTrigger(
                          title: 'Features ▾', 
                          isOpen: _openDropdown == 'Features',
                          onTap: () => _toggleDropdown('Features', _featuresLink),
                        ),
                      ),
                      const SizedBox(width: 4),
                      CompositedTransformTarget(
                        link: _legalLink,
                        child: _NavDropdownTrigger(
                          title: 'Legal ▾', 
                          isOpen: _openDropdown == 'Legal',
                          onTap: () => _toggleDropdown('Legal', _legalLink),
                        ),
                      ),
                      const SizedBox(width: 12),
                    ],

                    // Theme Toggle
                    _ThemeToggleButton(),

                    // Burger (Mobile)
                    if (isMobile) ...[
                      const SizedBox(width: 8),
                      _BurgerButton(onTap: () {
                        _closeDropdown();
                        widget.onBurgerTap();
                      }),
                    ],
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _NavLink extends StatefulWidget {
  final String title;
  final VoidCallback onTap;

  const _NavLink({required this.title, required this.onTap});

  @override
  State<_NavLink> createState() => _NavLinkState();
}

class _NavLinkState extends State<_NavLink> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedContainer(
          duration: NiTokens.hoverFast,
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
          decoration: BoxDecoration(
            color: _isHovered ? tokens.surface2 : Colors.transparent,
            borderRadius: NiTokens.pill,
          ),
          child: Text(
            widget.title,
            style: NiType.nav(context).copyWith(
              color: _isHovered ? tokens.accent : tokens.muted,
            ),
          ),
        ),
      ),
    );
  }
}

class _NavDropdownTrigger extends StatefulWidget {
  final String title;
  final bool isOpen;
  final VoidCallback onTap;

  const _NavDropdownTrigger({required this.title, required this.isOpen, required this.onTap});

  @override
  State<_NavDropdownTrigger> createState() => _NavDropdownTriggerState();
}

class _NavDropdownTriggerState extends State<_NavDropdownTrigger> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final active = widget.isOpen || _isHovered;
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: widget.onTap,
        child: AnimatedContainer(
          duration: NiTokens.hoverFast,
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
          decoration: BoxDecoration(
            color: active ? tokens.surface2 : Colors.transparent,
            borderRadius: NiTokens.pill,
          ),
          child: Text(
            widget.title,
            style: NiType.nav(context).copyWith(
              color: active ? tokens.accent : tokens.muted,
            ),
          ),
        ),
      ),
    );
  }
}

class _ThemeToggleButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final themeService = Provider.of<ThemeService>(context, listen: false);

    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () {
          themeService.toggleTheme();
        },
        child: Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: tokens.surface,
            shape: BoxShape.circle,
            border: Border.all(color: tokens.border, width: 1), // Hover accent handled later or with Stateful widget
          ),
          child: Center(
            child: Icon(
              tokens.isDark ? Icons.light_mode_outlined : Icons.dark_mode_outlined,
              size: 19,
              color: tokens.text,
            ),
          ),
        ),
      ),
    );
  }
}

class _BurgerButton extends StatelessWidget {
  final VoidCallback onTap;
  const _BurgerButton({required this.onTap});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: tokens.surface,
            shape: BoxShape.circle,
            border: Border.all(color: tokens.border, width: 1),
          ),
          child: Center(
            child: Icon(Icons.menu, size: 19, color: tokens.text),
          ),
        ),
      ),
    );
  }
}

class _FeaturesDropdownPanel extends StatelessWidget {
  final VoidCallback onClose;
  const _FeaturesDropdownPanel({required this.onClose});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final dataModel = Provider.of<DataModel>(context, listen: false);

    return Container(
      constraints: const BoxConstraints(minWidth: 560, maxHeight: 600), // 70vh simplified to 600px
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: tokens.surface,
        borderRadius: BorderRadius.circular(NiTokens.rMenu),
        border: Border.all(color: tokens.border),
        boxShadow: tokens.shadow,
      ),
      child: SingleChildScrollView(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: dataModel.apps.map((app) {
            return Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 8),
                      child: Text(
                        app.shortName,
                        style: NiType.footerHead(context).copyWith(color: tokens.text), // using footerHead as 600 .8rem text
                      ),
                    ),
                    ...app.features.map((f) => _DropdownLink(
                      text: f.title,
                      onTap: () {
                        onClose();
                        final frag = _slugify(f.title);
                        final key = AppScrollKeys.featureKeys['${app.id}-$frag'];
                        if (key != null && key.currentContext != null) {
                          Scrollable.ensureVisible(key.currentContext!, duration: const Duration(milliseconds: 500), curve: Curves.easeInOut);
                        } else {
                          context.go('/apps/${app.id}/#$frag');
                        }
                      },
                    )),
                  ],
                ),
              ),
            );
          }).toList(),
        ),
      ),
    );
  }
  
  String _slugify(String text) {
    return text.toLowerCase().replaceAll(RegExp(r'[^a-z0-9]+'), '-').replaceAll(RegExp(r'^-+|-+$'), '');
  }
}

class _LegalDropdownPanel extends StatelessWidget {
  final VoidCallback onClose;
  const _LegalDropdownPanel({required this.onClose});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final dataModel = Provider.of<DataModel>(context, listen: false);

    return Container(
      width: 250,
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: tokens.surface,
        borderRadius: BorderRadius.circular(NiTokens.rMenu),
        border: Border.all(color: tokens.border),
        boxShadow: tokens.shadow,
      ),
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: dataModel.apps.expand((app) {
            return [
              Padding(
                padding: const EdgeInsets.only(top: 12, bottom: 4, left: 8),
                child: Text(
                  app.shortName,
                  style: NiType.footerHead(context).copyWith(color: tokens.text),
                ),
              ),
              _DropdownLink(
                text: 'Privacy Policy',
                onTap: () {
                  onClose();
                  context.go('/apps/${app.id}/privacy');
                },
              ),
              _DropdownLink(
                text: 'Terms',
                onTap: () {
                  onClose();
                  context.go('/apps/${app.id}/terms');
                },
              ),
            ];
          }).toList(),
        ),
      ),
    );
  }
}

class _DropdownLink extends StatefulWidget {
  final String text;
  final VoidCallback onTap;

  const _DropdownLink({required this.text, required this.onTap});

  @override
  State<_DropdownLink> createState() => _DropdownLinkState();
}

class _DropdownLinkState extends State<_DropdownLink> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: widget.onTap,
        child: Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 8),
          decoration: BoxDecoration(
            color: _isHovered ? tokens.surface2 : Colors.transparent,
            borderRadius: BorderRadius.circular(6),
          ),
          child: Text(
            widget.text,
            style: NiType.nav(context).copyWith(
              color: _isHovered ? tokens.text : tokens.muted,
            ),
          ),
        ),
      ),
    );
  }
}
