import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'models/data_model.dart';
import "ui/pages/profile_page.dart" deferred as profile;
import "ui/pages/timeline_page.dart" deferred as timeline;
import "ui/pages/story_page.dart" deferred as story;
import "ui/pages/projects_page.dart" deferred as projects;
import "ui/pages/stack_page.dart" deferred as stack;
import 'ui/pages/home_page.dart' deferred as home;
import 'ui/pages/app_details_page.dart';
import 'ui/pages/legal_page.dart';
import 'ui/pages/how_to_page.dart';
import 'ui/pages/sitemap_page.dart';
import 'ui/pages/not_found_page.dart';
import 'ui/widgets/main_layout.dart';
import 'ui/widgets/profile_layout.dart';
import 'services/current_app_service.dart';

class DeferredLoader extends StatelessWidget {
  final Future<void> loadLibrary;
  final WidgetBuilder builder;

  const DeferredLoader({
    super.key,
    required this.loadLibrary,
    required this.builder,
  });

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: loadLibrary,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done) {
          return builder(context);
        }
        return const Scaffold(
          body: Center(
            child: CircularProgressIndicator(),
          ),
        );
      },
    );
  }
}

final GoRouter router = GoRouter(
  initialLocation: '/',
  errorBuilder: (context, state) => const NotFoundPage(),
  routes: [
    // Main Website Routes
    ShellRoute(
      builder: (context, state, child) {
        return MainLayout(child: child);
      },
      routes: [
        GoRoute(
          path: '/',
          builder: (context, state) => DeferredLoader(
            loadLibrary: home.loadLibrary(),
            builder: (_) => home.HomePage(),
          ),
        ),
        GoRoute(
          path: '/apps/:id',
          builder: (context, state) {
            final id = state.pathParameters['id']!;
            return AppDetailsPage(appId: id);
          },
          routes: [
            GoRoute(
              path: 'how-to',
              builder: (context, state) {
                final id = state.pathParameters['id']!;
                return HowToPage(appId: id);
              },
            ),
            GoRoute(
              path: 'privacy',
              builder: (context, state) {
                final id = state.pathParameters['id']!;
                final dataModel = Provider.of<DataModel>(
                  context,
                  listen: false,
                );
                final app = dataModel.apps.firstWhere(
                  (element) => element.id == id,
                  orElse: () => AppModel(
                    id: 'error',
                    name: 'App Not Found',
                    shortDescription: '',
                    fullDescription: '',
                    iconUrl: '',
                    tags: [],
                    features: [],
                    technicalDetails: [],
                    screenshots: [],
                    links: [],
                    privacyPolicy: AppPolicy(url: '', features: []),
                    termsAndConditions: AppPolicy(url: '', features: []),
                  ),
                );
                return LegalPage(
                  title: 'Privacy Policy',
                  features: app.privacyPolicy.features,
                  app: app,
                  pageType: PageType.privacy,
                );
              },
            ),
            GoRoute(
              path: 'terms',
              builder: (context, state) {
                final id = state.pathParameters['id']!;
                final dataModel = Provider.of<DataModel>(
                  context,
                  listen: false,
                );
                final app = dataModel.apps.firstWhere(
                  (element) => element.id == id,
                  orElse: () => AppModel(
                    id: 'error',
                    name: 'App Not Found',
                    shortDescription: '',
                    fullDescription: '',
                    iconUrl: '',
                    tags: [],
                    features: [],
                    technicalDetails: [],
                    screenshots: [],
                    links: [],
                    privacyPolicy: AppPolicy(url: '', features: []),
                    termsAndConditions: AppPolicy(url: '', features: []),
                  ),
                );
                return LegalPage(
                  title: 'Terms & Conditions',
                  features: app.termsAndConditions.features,
                  app: app,
                  pageType: PageType.terms,
                );
              },
            ),
          ],
        ),
        GoRoute(
          path: '/sitemap',
          builder: (context, state) => const SitemapPage(),
        ),
      ],
    ),
    // Profile Section Routes
    ShellRoute(
      builder: (context, state, child) {
        return ProfileLayout(child: child);
      },
      routes: [
        GoRoute(
          path: '/profile',
          builder: (context, state) => DeferredLoader(
            loadLibrary: profile.loadLibrary(),
            builder: (_) => profile.ProfilePage(),
          ),
        ),
        GoRoute(
          path: '/profile/timeline',
          builder: (context, state) => DeferredLoader(
            loadLibrary: timeline.loadLibrary(),
            builder: (_) => timeline.TimelinePage(),
          ),
        ),
        GoRoute(
          path: '/profile/story',
          builder: (context, state) => DeferredLoader(
            loadLibrary: story.loadLibrary(),
            builder: (_) => story.StoryPage(),
          ),
        ),
        GoRoute(
          path: '/profile/projects',
          builder: (context, state) => DeferredLoader(
            loadLibrary: projects.loadLibrary(),
            builder: (_) => projects.ProjectsPage(),
          ),
        ),
        GoRoute(
          path: '/profile/stack',
          builder: (context, state) => DeferredLoader(
            loadLibrary: stack.loadLibrary(),
            builder: (_) => stack.StackPage(),
          ),
        ),
      ],
    ),
  ],
);
