import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../models/data_model.dart';
import '../design_tokens.dart';
import 'card_marquee.dart';
import 'image_helper.dart';

class MilestoneCard extends StatefulWidget {
  final MilestoneModel milestone;
  final AppModel app;
  final ValueChanged<bool>? onHoverChanged;

  const MilestoneCard({
    super.key,
    required this.milestone,
    required this.app,
    this.onHoverChanged,
  });

  @override
  State<MilestoneCard> createState() => MilestoneCardState();
}

class MilestoneCardState extends State<MilestoneCard> {
  final LayerLink _layerLink = LayerLink();
  OverlayEntry? _overlayEntry;
  int _hoverCount = 0;
  Timer? _exitTimer;
  CardMarqueeScope? _marqueeScope;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _marqueeScope = CardMarqueeScope.of(context);
  }

  void _notifyHover(bool isHovered) {
    widget.onHoverChanged?.call(isHovered);
    _marqueeScope?.onHoverChanged(isHovered);
  }

  void _onEnter() {
    _exitTimer?.cancel();
    _exitTimer = null;
    _hoverCount++;
    if (_hoverCount == 1) {
      _notifyHover(true);
      _showOverlay();
    }
  }

  void _onExit() {
    _hoverCount--;
    _exitTimer?.cancel();
    _exitTimer = Timer(const Duration(milliseconds: 100), () {
      if (mounted && _hoverCount <= 0) {
        _hoverCount = 0;
        _hideOverlay();
        _notifyHover(false);
      }
    });
  }

  void _showOverlay() {
    if (_overlayEntry != null) return;
    final overlayState = Overlay.maybeOf(context);
    if (overlayState == null) return;

    final renderBox = context.findRenderObject() as RenderBox?;
    final cardGlobalOffset = renderBox?.localToGlobal(Offset.zero) ?? Offset.zero;
    final mediaQuery = MediaQuery.of(context);
    final screenHeight = mediaQuery.size.height;
    final hasScreenshot = widget.milestone.screenshot.url.isNotEmpty;
    final estimatedHeight = hasScreenshot ? 320.0 : 160.0;

    // Open below if card is near the top of the viewport; otherwise open above
    final bool showAbove = cardGlobalOffset.dy > (estimatedHeight + 40) ||
        (cardGlobalOffset.dy + (renderBox?.size.height ?? 96) + estimatedHeight > screenHeight);

    final entry = OverlayEntry(
      builder: (overlayContext) {
        return Stack(
          children: [
            Positioned.fill(
              child: GestureDetector(
                behavior: HitTestBehavior.translucent,
                onTap: () {
                  _onExit();
                },
                child: const SizedBox.expand(),
              ),
            ),
            CompositedTransformFollower(
              link: _layerLink,
              showWhenUnlinked: false,
              targetAnchor: showAbove ? Alignment.topCenter : Alignment.bottomCenter,
              followerAnchor: showAbove ? Alignment.bottomCenter : Alignment.topCenter,
              offset: Offset(0, showAbove ? -8 : 8),
              child: Align(
                alignment: showAbove ? Alignment.bottomCenter : Alignment.topCenter,
                child: _buildPopoverContent(context, showAbove: showAbove),
              ),
            ),
          ],
        );
      },
    );

    _overlayEntry = entry;
    overlayState.insert(entry);
  }

  void _hideOverlay() {
    if (_overlayEntry != null) {
      _overlayEntry?.remove();
      _overlayEntry = null;
    }
  }

  @override
  void dispose() {
    _exitTimer?.cancel();
    _hideOverlay();
    super.dispose();
  }

  Widget _buildPopoverContent(BuildContext inheritedContext, {bool showAbove = true}) {
    final tokens = Theme.of(inheritedContext).extension<NiTokens>() ??
        (Theme.of(inheritedContext).brightness == Brightness.dark ? NiTokens.dark : NiTokens.light);
    final hasScreenshot = widget.milestone.screenshot.url.isNotEmpty;
    final mediaQuery = MediaQuery.of(inheritedContext);
    final screenWidth = mediaQuery.size.width;
    final isMobile = screenWidth < 600;

    // Smart adaptive width sizing
    final double targetWidth;
    if (isMobile) {
      targetWidth = (screenWidth - 32).clamp(240.0, 320.0);
    } else {
      if (hasScreenshot) {
        targetWidth = 320.0;
      } else if (widget.milestone.description.length > 90) {
        targetWidth = 300.0;
      } else {
        targetWidth = 270.0;
      }
    }

    final double imageHeight = isMobile ? 130.0 : 160.0;
    final dateDisplay = widget.milestone.formattedDate.isNotEmpty
        ? widget.milestone.formattedDate
        : widget.milestone.date;

    return Material(
      type: MaterialType.transparency,
      child: MouseRegion(
        onEnter: (_) => _onEnter(),
        onExit: (_) => _onExit(),
        child: Container(
          width: targetWidth,
          decoration: BoxDecoration(
            color: NiTokens.lightboxScrim,
            borderRadius: BorderRadius.circular(NiTokens.rStage),
            border: Border.all(color: tokens.border, width: 1),
            boxShadow: tokens.shadow,
          ),
          clipBehavior: Clip.antiAlias,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (hasScreenshot)
                Padding(
                  padding: const EdgeInsets.fromLTRB(12, 12, 12, 0),
                  child: buildImage(
                    widget.milestone.screenshot.url,
                    width: double.infinity,
                    height: imageHeight,
                    fit: BoxFit.cover,
                    borderRadius: BorderRadius.circular(NiTokens.rInlineImg),
                  ),
                ),
              Padding(
                padding: const EdgeInsets.all(14),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Row(
                      children: [
                        ClipRRect(
                          borderRadius: BorderRadius.circular(NiTokens.iconRadius(28, small: true)),
                          child: Image.asset(
                            widget.app.iconUrl,
                            width: 28,
                            height: 28,
                            errorBuilder: (_, _, _) => const Icon(Icons.apps, size: 28, color: Colors.white),
                          ),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                widget.milestone.title,
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 14,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                dateDisplay,
                                style: TextStyle(
                                  color: NiTokens.dark.muted,
                                  fontSize: 11,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    if (widget.milestone.description.isNotEmpty) ...[
                      const SizedBox(height: 10),
                      Text(
                        widget.milestone.description,
                        style: TextStyle(
                          color: NiTokens.dark.text,
                          fontSize: 12.5,
                          height: 1.4,
                        ),
                      ),
                    ],
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    ).animate().fadeIn(duration: NiTokens.hoverFast).scale(begin: const Offset(0.96, 0.96));
  }

  Widget _buildCompactCard(BuildContext context) {
    final tokens = Theme.of(context).extension<NiTokens>() ??
        (Theme.of(context).brightness == Brightness.dark ? NiTokens.dark : NiTokens.light);
    final dateDisplay = widget.milestone.formattedDate.isNotEmpty
        ? widget.milestone.formattedDate
        : widget.milestone.date;

    return Container(
      width: 260,
      height: 96,
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: tokens.surface,
        borderRadius: BorderRadius.circular(NiTokens.r),
        border: Border.all(color: tokens.border, width: 1),
        boxShadow: tokens.shadow,
      ),
      child: Row(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(NiTokens.iconRadius(40, small: true)),
            child: Image.asset(
              widget.app.iconUrl,
              width: 40,
              height: 40,
              errorBuilder: (_, _, _) => const Icon(Icons.apps, size: 40),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  widget.milestone.title,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    color: tokens.text,
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    height: 1.25,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  dateDisplay,
                  style: TextStyle(
                    color: tokens.muted,
                    fontSize: 11,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return CompositedTransformTarget(
      link: _layerLink,
      child: MouseRegion(
        onEnter: (_) => _onEnter(),
        onExit: (_) => _onExit(),
        cursor: SystemMouseCursors.click,
        child: GestureDetector(
          onTap: () {
            if (_overlayEntry != null) {
              _onExit();
            } else {
              _onEnter();
            }
          },
          child: _buildCompactCard(context),
        ),
      ),
    );
  }
}
