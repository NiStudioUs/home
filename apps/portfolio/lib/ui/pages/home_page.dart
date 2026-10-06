import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../../utils/scroll_keys.dart';
import 'package:go_router/go_router.dart';
import '../../models/data_model.dart';
import '../design_tokens.dart';
import '../widgets/home_hero.dart';
import '../widgets/home_features.dart';
import '../widgets/home_apps.dart';
import '../widgets/home_learning.dart';
import '../widgets/contact_card.dart';
import '../widgets/stats_row.dart';
import '../widgets/footer.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final section = GoRouterState.of(context).uri.fragment;
      if (section.isNotEmpty) {
        _scrollToSection(section);
      }
    });
  }

  void _scrollToSection(String section) {
    GlobalKey? key;
    if (section == 'features') key = AppScrollKeys.featuresKey;
    if (section == 'apps') key = AppScrollKeys.appsKey;
    if (section == 'learning') key = AppScrollKeys.learningKey;
    if (section == 'contact') key = AppScrollKeys.contactKey;

    if (key != null && key.currentContext != null) {
      Scrollable.ensureVisible(
        key.currentContext!,
        duration: const Duration(milliseconds: 500),
        curve: Curves.easeInOut,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final tokens = NiTokens.of(context);
    final dataModel = Provider.of<DataModel>(context);
    
    // For padding and sizing
    final double heroPadding = NiTokens.clampW(context, 56, 8, 100);
    final double sectionPadding = NiTokens.clampW(context, 56, 8, 104);

    return Scaffold(
      backgroundColor: tokens.bg,
      body: SingleChildScrollView(
        padding: const EdgeInsets.only(top: NiTokens.topbarHeight),
        child: Column(
          children: [
            // Hero section
            Padding(
              padding: EdgeInsets.only(top: heroPadding),
              child: const HomeHero(),
            ),
            
            // Marquee
            NiMarquee(items: dataModel.apps.expand((app) => app.features.map((f) => f.title)).toList()),
            
            // Stats
            const StatsRow(),
            
            // Features (Alt Section)
            Container(
              key: AppScrollKeys.featuresKey,
              width: double.infinity,
              decoration: BoxDecoration(
                color: tokens.bgAlt,
                border: Border.symmetric(horizontal: BorderSide(color: tokens.border)),
              ),
              padding: EdgeInsets.symmetric(vertical: sectionPadding),
              child: const HomeFeatures(),
            ),
            
            // Apps
            Container(
              key: AppScrollKeys.appsKey,
              width: double.infinity,
              padding: EdgeInsets.symmetric(vertical: sectionPadding),
              child: const HomeApps(),
            ),
            
            // Learning Lab (Alt Section)
            Container(
              key: AppScrollKeys.learningKey,
              width: double.infinity,
              decoration: BoxDecoration(
                color: tokens.bgAlt,
                border: Border.symmetric(horizontal: BorderSide(color: tokens.border)),
              ),
              padding: EdgeInsets.symmetric(vertical: sectionPadding),
              child: const HomeLearning(),
            ),
            
            // Contact
            Container(
              key: AppScrollKeys.contactKey,
              width: double.infinity,
              padding: EdgeInsets.symmetric(vertical: sectionPadding),
              child: Center(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: NiTokens.maxWidth),
                  child: const Padding(
                    padding: EdgeInsets.symmetric(horizontal: NiTokens.gutter),
                    child: ContactCard(),
                  ),
                ),
              ),
            ),
            
            // Footer
            const NiFooter(),
          ],
        ),
      ),
    );
  }
}
