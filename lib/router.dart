import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'models/data_model.dart';
import 'ui/pages/home_page.dart';
import 'ui/pages/app_details_page.dart';
import 'ui/pages/legal_page.dart';
import 'ui/pages/how_to_page.dart';
import 'ui/widgets/main_layout.dart';
import 'services/current_app_service.dart';

final GoRouter router = GoRouter(
  initialLocation: '/',
  routes: [
    ShellRoute(
      builder: (context, state, child) {
        return MainLayout(child: child);
      },
      routes: [
        GoRoute(path: '/', builder: (context, state) => const HomePage()),
        GoRoute(
          path: '/app/:id',
          builder: (context, state) {
            final id = state.pathParameters['id']!;
            return AppDetailsPage(appId: id);
          },
          routes: [
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
        GoRoute(path: '/howto', builder: (context, state) => const HowToPage()),
      ],
    ),
  ],
);
