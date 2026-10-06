import 'package:flutter/material.dart';

import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'router.dart';
import 'services/theme_service.dart';
import 'services/data_service.dart';
import 'services/current_app_service.dart';
import 'models/data_model.dart';
import 'ui/design_tokens.dart';
void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  final dataService = DataService();
  final data = await dataService.loadData();

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ThemeService()),
        ChangeNotifierProvider(create: (_) => CurrentAppService()),
        Provider<DataModel>.value(value: data),
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
    precacheImage(const AssetImage('assets/developers/dev-avatar.webp'), context);
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
