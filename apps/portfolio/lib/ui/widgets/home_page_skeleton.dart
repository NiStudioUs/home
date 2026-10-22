import 'package:flutter/material.dart';
import '../design_tokens.dart';
import 'image_helper.dart';

/// Full-page structural skeleton mimicking HomePage layout while deferred libraries load.
class HomePageSkeleton extends StatelessWidget {
  const HomePageSkeleton({super.key});

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final isMobile = NiTokens.isMobile(context);
    final double heroPadding = NiTokens.clampW(context, 6, 1.0, 14);

    return Scaffold(
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
                                    const SizedBox(height: 36),
                                    _buildAppSpotlightSkeleton(context),
                                  ],
                                ),
                              ),
                              const SizedBox(width: 24),
                              // Right column (floating phones)
                              Expanded(
                                flex: 65,
                                child: SizedBox(
                                  height: 540,
                                  child: Stack(
                                    children: [
                                      Positioned(
                                        left: 0,
                                        top: 50,
                                        child: NiImageSkeleton(
                                          width: 210,
                                          height: 440,
                                          borderRadius: BorderRadius.circular(NiTokens.rPhone),
                                        ),
                                      ),
                                      Positioned(
                                        left: 110,
                                        top: 10,
                                        child: NiImageSkeleton(
                                          width: 210,
                                          height: 440,
                                          borderRadius: BorderRadius.circular(NiTokens.rPhone),
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
            const SizedBox(height: 60),

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
            const SizedBox(height: 40),

            // Stats Row Skeleton
            Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: NiTokens.gutter),
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
            const SizedBox(height: 60),
          ],
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

  Widget _buildAppSpotlightSkeleton(BuildContext context) {
    return const NiImageSkeleton(
      width: 360,
      height: 72,
      borderRadius: BorderRadius.all(Radius.circular(16)),
    );
  }
}
