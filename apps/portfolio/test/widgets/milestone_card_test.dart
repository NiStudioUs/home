import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:nistudious_website/models/data_model.dart';
import 'package:nistudious_website/ui/design_tokens.dart';
import 'package:nistudious_website/ui/widgets/milestone_card.dart';

void main() {
  final testApp = AppModel(
    id: 'test-app',
    name: 'Test App',
    shortDescription: 'Short description',
    fullDescription: 'Full description',
    iconUrl: 'assets/images/alarm-clock/icon.webp',
    tags: ['utility'],
    features: [],
    technicalDetails: [],
    screenshots: [],
    links: [],
    privacyPolicy: AppPolicy(url: '', features: []),
    termsAndConditions: AppPolicy(url: '', features: []),
  );

  final testMilestone = MilestoneModel(
    date: '2026-10-29',
    title: 'Published to Internal Testing',
    description: 'Detailed description inside the popover.',
  );

  Widget buildTestableWidget(Widget child) {
    return MaterialApp(
      theme: NiTheme.light(),
      home: Scaffold(
        body: Center(
          child: child,
        ),
      ),
    );
  }

  testWidgets('MilestoneCard displays compact resting state initially', (tester) async {
    await tester.pumpWidget(
      buildTestableWidget(
        MilestoneCard(
          milestone: testMilestone,
          app: testApp,
        ),
      ),
    );

    expect(find.text('Published to Internal Testing'), findsOneWidget);
    expect(find.text('Oct 29, 2026'), findsOneWidget);
    // Description should only be in the popover, not resting card
    expect(find.text('Detailed description inside the popover.'), findsNothing);
  });

  testWidgets('MilestoneCard hover inserts popover into tree and removes on exit', (tester) async {
    bool? hoveredState;

    await tester.pumpWidget(
      buildTestableWidget(
        MilestoneCard(
          milestone: testMilestone,
          app: testApp,
          onHoverChanged: (val) => hoveredState = val,
        ),
      ),
    );

    final cardFinder = find.byType(MilestoneCard);
    expect(cardFinder, findsOneWidget);

    final gesture = await tester.createGesture(kind: PointerDeviceKind.mouse);
    await gesture.addPointer(location: Offset.zero);

    // Hover over the card
    await gesture.moveTo(tester.getCenter(cardFinder));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 50));
    await tester.pumpAndSettle();

    expect(hoveredState, isTrue);
    expect(find.text('Detailed description inside the popover.'), findsOneWidget);

    // Move cursor away
    await gesture.moveTo(const Offset(800, 800));
    await tester.pump();
    // Allow debounce timer (100ms) to fire
    await tester.pump(const Duration(milliseconds: 150));
    await tester.pumpAndSettle();

    expect(hoveredState, isFalse);
    expect(find.text('Detailed description inside the popover.'), findsNothing);

    await gesture.removePointer();
  });
}
