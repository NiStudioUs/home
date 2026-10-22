import 'package:flutter/material.dart';
import '../design_tokens.dart';
import 'image_helper.dart';

/// Full-page structural skeleton mimicking HomePage layout while deferred libraries load.
class HomePageSkeleton extends StatelessWidget {
  const HomePageSkeleton({super.key});

  @override
  Widget build(BuildContext context) {
    // Force light theme tokens for skeleton loading as requested
    final tokens = NiTokens.light;
    final isMobile = NiTokens.isMobile(context);
    final double heroPadding = NiTokens.clampW(context, 0, 0.5, 8);
    final double sectionPadding = NiTokens.clampW(context, 56, 8, 104);

    return Theme(
      data: NiTheme.light(),
      child: Scaffold(
        backgroundColor: tokens.bg,
        body: SingleChildScrollView(
          padding: const EdgeInsets.only(top: NiTokens.topbarHeight),
          physics: const NeverScrollableScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Hero Skeleton Area
              Padding(
                padding: EdgeInsets.only(top: heroPadding),
                child: Center(
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: NiTokens.gutter),
                      child: isMobile
                          ? Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                _buildPillSkeleton(),
                                const SizedBox(height: 24),
                                _buildHeadlineSkeleton(context),
                                const SizedBox(height: 20),
                                _buildLeadSkeleton(),
                                const SizedBox(height: 24),
                                _buildButtonRowSkeleton(),
                                const SizedBox(height: 34),
                                _buildAppSpotlightSkeleton(context, tokens),
                                const SizedBox(height: 36),
                                Center(
                                  child: NiImageSkeleton(
                                    width: 220,
                                    height: 440,
                                    borderRadius: BorderRadius.circular(NiTokens.rPhone),
                                  ),
                                ),
                              ],
                            )
                          : Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                // Left column
                                Expanded(
                                  flex: 135,
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      _buildPillSkeleton(),
                                      const SizedBox(height: 24),
                                      _buildHeadlineSkeleton(context),
                                      const SizedBox(height: 24),
                                      _buildLeadSkeleton(),
                                      const SizedBox(height: 28),
                                      _buildButtonRowSkeleton(),
                                      const SizedBox(height: 34),
                                      _buildAppSpotlightSkeleton(context, tokens),
                                    ],
                                  ),
                                ),
                                const SizedBox(width: 24),
                                // Right column (floating phones matching _RightColumn)
                                Expanded(
                                  flex: 65,
                                  child: SizedBox(
                                    height: 540,
                                    child: Stack(
                                      children: [
                                        Positioned(
                                          left: 0,
                                          top: 80,
                                          child: Transform.rotate(
                                            angle: -0.1,
                                            child: NiImageSkeleton(
                                              width: 210,
                                              height: 440,
                                              borderRadius: BorderRadius.circular(NiTokens.rPhone),
                                            ),
                                          ),
                                        ),
                                        Positioned(
                                          left: 108,
                                          top: 5,
                                          child: Transform.rotate(
                                            angle: 0.05,
                                            child: NiImageSkeleton(
                                              width: 210,
                                              height: 440,
                                              borderRadius: BorderRadius.circular(NiTokens.rPhone),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 50),

              // Marquee Strip Skeleton
              Container(
                height: 46,
                decoration: BoxDecoration(
                  color: tokens.surface,
                  border: Border.symmetric(horizontal: BorderSide(color: tokens.border)),
                ),
                child: const Center(
                  child: NiImageSkeleton(width: 380, height: 16, borderRadius: BorderRadius.all(Radius.circular(8))),
                ),
              ),

              // Stats Row Skeleton
              Center(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(NiTokens.gutter, 38, NiTokens.gutter, 56),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: List.generate(
                        isMobile ? 2 : 4,
                        (_) => Column(
                          children: const [
                            NiImageSkeleton(width: 60, height: 32, borderRadius: BorderRadius.all(Radius.circular(6))),
                            SizedBox(height: 8),
                            NiImageSkeleton(width: 80, height: 14, borderRadius: BorderRadius.all(Radius.circular(4))),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ),

              // Features Section Skeleton (Alt Section)
              Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  color: tokens.bgAlt,
                  border: Border.symmetric(horizontal: BorderSide(color: tokens.border)),
                ),
                padding: EdgeInsets.symmetric(vertical: sectionPadding),
                child: Center(
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: NiTokens.gutter),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const NiImageSkeleton(width: 80, height: 14, borderRadius: BorderRadius.all(Radius.circular(4))),
                          const SizedBox(height: 14),
                          const NiImageSkeleton(width: 320, height: 36, borderRadius: BorderRadius.all(Radius.circular(8))),
                          const SizedBox(height: 14),
                          const NiImageSkeleton(width: 440, height: 16, borderRadius: BorderRadius.all(Radius.circular(4))),
                          const SizedBox(height: 44),
                          ...List.generate(
                            2,
                            (_) => Padding(
                              padding: const EdgeInsets.only(bottom: 24),
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
                                decoration: BoxDecoration(
                                  color: tokens.surface,
                                  borderRadius: BorderRadius.circular(NiTokens.r),
                                  border: Border.all(color: tokens.border, width: 1),
                                ),
                                child: isMobile
                                    ? Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Row(
                                            children: const [
                                              NiImageSkeleton(width: 44, height: 44, borderRadius: BorderRadius.all(Radius.circular(10))),
                                              SizedBox(width: 14),
                                              NiImageSkeleton(width: 120, height: 20, borderRadius: BorderRadius.all(Radius.circular(4))),
                                            ],
                                          ),
                                          const SizedBox(height: 16),
                                          Wrap(
                                            spacing: 8,
                                            runSpacing: 8,
                                            children: List.generate(
                                              3,
                                              (_) => const NiImageSkeleton(width: 90, height: 30, borderRadius: BorderRadius.all(Radius.circular(999))),
                                            ),
                                          ),
                                        ],
                                      )
                                    : Row(
                                        children: [
                                          const NiImageSkeleton(width: 44, height: 44, borderRadius: BorderRadius.all(Radius.circular(10))),
                                          const SizedBox(width: 14),
                                          const NiImageSkeleton(width: 120, height: 20, borderRadius: BorderRadius.all(Radius.circular(4))),
                                          const Spacer(),
                                          Wrap(
                                            spacing: 8,
                                            children: List.generate(
                                              4,
                                              (_) => const NiImageSkeleton(width: 100, height: 32, borderRadius: BorderRadius.all(Radius.circular(999))),
                                            ),
                                          ),
                                        ],
                                      ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),

              // Apps Section Skeleton
              Container(
                width: double.infinity,
                padding: EdgeInsets.symmetric(vertical: sectionPadding),
                child: Center(
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: NiTokens.gutter),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const NiImageSkeleton(width: 60, height: 14, borderRadius: BorderRadius.all(Radius.circular(4))),
                          const SizedBox(height: 14),
                          const NiImageSkeleton(width: 260, height: 36, borderRadius: BorderRadius.all(Radius.circular(8))),
                          const SizedBox(height: 44),
                          Container(
                            height: 280,
                            padding: const EdgeInsets.all(24),
                            decoration: BoxDecoration(
                              color: tokens.surface,
                              borderRadius: BorderRadius.circular(NiTokens.rCard),
                              border: Border.all(color: tokens.border, width: 1),
                            ),
                            child: Row(
                              children: [
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: const [
                                      NiImageSkeleton(width: 64, height: 64, borderRadius: BorderRadius.all(Radius.circular(14))),
                                      SizedBox(height: 18),
                                      NiImageSkeleton(width: 180, height: 26, borderRadius: BorderRadius.all(Radius.circular(6))),
                                      SizedBox(height: 10),
                                      NiImageSkeleton(width: 280, height: 16, borderRadius: BorderRadius.all(Radius.circular(4))),
                                    ],
                                  ),
                                ),
                                if (!isMobile)
                                  const NiImageSkeleton(
                                    width: 160,
                                    height: 230,
                                    borderRadius: BorderRadius.all(Radius.circular(18)),
                                  ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 60),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPillSkeleton() {
    return const NiImageSkeleton(
      width: 170,
      height: 32,
      borderRadius: BorderRadius.all(Radius.circular(999)),
    );
  }

  Widget _buildHeadlineSkeleton(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        NiImageSkeleton(width: 320, height: 48, borderRadius: BorderRadius.all(Radius.circular(8))),
        SizedBox(height: 12),
        NiImageSkeleton(width: 260, height: 48, borderRadius: BorderRadius.all(Radius.circular(8))),
      ],
    );
  }

  Widget _buildLeadSkeleton() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        NiImageSkeleton(width: 480, height: 16, borderRadius: BorderRadius.all(Radius.circular(4))),
        SizedBox(height: 8),
        NiImageSkeleton(width: 390, height: 16, borderRadius: BorderRadius.all(Radius.circular(4))),
      ],
    );
  }

  Widget _buildButtonRowSkeleton() {
    return Row(
      children: const [
        NiImageSkeleton(width: 140, height: 44, borderRadius: BorderRadius.all(Radius.circular(999))),
        SizedBox(width: 12),
        NiImageSkeleton(width: 140, height: 44, borderRadius: BorderRadius.all(Radius.circular(999))),
      ],
    );
  }

  Widget _buildAppSpotlightSkeleton(BuildContext context, NiTokens tokens) {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 520),
      child: Container(
        padding: const EdgeInsets.fromLTRB(14, 20, 14, 14),
        decoration: BoxDecoration(
          color: tokens.surface,
          borderRadius: BorderRadius.circular(NiTokens.rCard),
          border: Border.all(color: tokens.border, width: 1),
        ),
        child: Row(
          children: [
            const NiImageSkeleton(
              width: 52,
              height: 52,
              borderRadius: BorderRadius.all(Radius.circular(12)),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  NiImageSkeleton(width: 90, height: 11, borderRadius: BorderRadius.all(Radius.circular(4))),
                  SizedBox(height: 6),
                  NiImageSkeleton(width: 140, height: 18, borderRadius: BorderRadius.all(Radius.circular(4))),
                  SizedBox(height: 6),
                  NiImageSkeleton(width: 220, height: 13, borderRadius: BorderRadius.all(Radius.circular(4))),
                ],
              ),
            ),
            const SizedBox(width: 16),
            const NiImageSkeleton(
              width: 20,
              height: 20,
              borderRadius: BorderRadius.all(Radius.circular(10)),
            ),
          ],
        ),
      ),
    );
  }
}
