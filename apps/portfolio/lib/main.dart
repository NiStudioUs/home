import 'package:flutter/material.dart';
import 'package:flutter_web_plugins/url_strategy.dart';

import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'router.dart';
import 'services/theme_service.dart';
import 'services/data_service.dart';
import 'services/howto_service.dart';
import 'services/current_app_service.dart';
import 'models/data_model.dart';
import 'models/howto_model.dart';
import 'ui/design_tokens.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // Without this, Flutter web defaults to hash-based URLs
  // (.../#/apps/edgewise) even though every GoRoute here is a clean path
  // and web/404.html + the restore script in web/index.html implement the
  // rafgraph/spa-github-pages trick specifically for path-based routing —
  // that trick is a no-op without this call, since HashUrlStrategy never
  // looks at the pathname/query it restores, only the hash.
  usePathUrlStrategy();
  GoogleFonts.config.allowRuntimeFetching = true;

  final dataService = DataService();
  final data = await dataService.loadData();

  final howtoService = HowtoService();
  final howtoIndex = await howtoService.loadHowtoIndex();

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ThemeService()),
        ChangeNotifierProvider(create: (_) => CurrentAppService()),
        Provider<DataModel>.value(value: data),
        Provider<HowtoIndexModel>.value(value: howtoIndex),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Pre-cache critical images so they appear instantly when the HTML loader fades out
    precacheImage(
      const AssetImage('assets/developers/dev-avatar.webp'),
      context,
    );
  }

  @override
  Widget build(BuildContext context) {
    final themeService = Provider.of<ThemeService>(context);

    return MaterialApp.router(
      title: 'Developer Portfolio',
      themeMode: themeService.themeMode,
      theme: NiTheme.light(),
      darkTheme: NiTheme.dark(),
      routerConfig: router,
      debugShowCheckedModeBanner: false,
    );
  }
}
