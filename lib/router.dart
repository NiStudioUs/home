import 'package:go_router/go_router.dart';
import 'ui/pages/home_page.dart';
import 'ui/pages/app_details_page.dart';
import 'ui/pages/how_to_page.dart';
import 'ui/widgets/main_layout.dart';

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
        ),
        GoRoute(path: '/howto', builder: (context, state) => const HowToPage()),
      ],
    ),
  ],
);
