import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'models/data_model.dart';
import "ui/pages/profile_page.dart";
import "ui/pages/timeline_page.dart";
import "ui/pages/story_page.dart";
import "ui/pages/projects_page.dart";
import "ui/pages/stack_page.dart";
import 'ui/pages/home_page.dart';
import 'ui/pages/app_details_page.dart';
import 'ui/pages/legal_page.dart';
import 'ui/pages/how_to_page.dart';
import 'ui/pages/sitemap_page.dart';
import 'ui/pages/not_found_page.dart';
import 'ui/widgets/main_layout.dart';
import 'ui/widgets/profile_layout.dart';
import 'services/current_app_service.dart';

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
        GoRoute(path: '/', builder: (context, state) => const HomePage()),
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
        GoRoute(path: '/profile', builder: (context, state) => const ProfilePage()),
        GoRoute(path: '/profile/timeline', builder: (context, state) => const TimelinePage()),
        GoRoute(path: '/profile/story', builder: (context, state) => const StoryPage()),
        GoRoute(path: '/profile/projects', builder: (context, state) => const ProjectsPage()),
        GoRoute(path: '/profile/stack', builder: (context, state) => const StackPage()),
      ],
    ),
  ],
);
