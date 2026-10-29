import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:nistudious_website/ui/widgets/card_marquee.dart';
import 'package:nistudious_website/ui/design_tokens.dart';

void main() {
  Widget buildTestableWidget(Widget child) {
    return MaterialApp(
      theme: NiTheme.light(),
      home: Scaffold(
        body: Center(child: child),
      ),
    );
  }

  testWidgets('CardMarquee renders single card stationary without 3x duplication', (tester) async {
    await tester.pumpWidget(
      buildTestableWidget(
        const CardMarquee(
          cards: [
            Text('Solo Card'),
          ],
        ),
      ),
    );

    expect(find.text('Solo Card'), findsOneWidget);
  });

  testWidgets('CardMarquee renders multiple cards duplicated across 3 tracks', (tester) async {
    await tester.pumpWidget(
      buildTestableWidget(
        const CardMarquee(
          cards: [
            Text('Card Alpha'),
            Text('Card Beta'),
          ],
        ),
      ),
    );

    expect(find.text('Card Alpha'), findsNWidgets(3));
    expect(find.text('Card Beta'), findsNWidgets(3));
  });

  testWidgets('CardMarquee pauses controller on mouse hover and resumes on exit', (tester) async {
    await tester.pumpWidget(
      buildTestableWidget(
        const CardMarquee(
          cards: [
            Text('Card Alpha'),
            Text('Card Beta'),
          ],
        ),
      ),
    );

    final marqueeFinder = find.byType(CardMarquee);
    expect(marqueeFinder, findsOneWidget);

    final state = tester.state<CardMarqueeState>(marqueeFinder);
    expect(state.controller.isAnimating, isTrue);

    // Simulate mouse entering the marquee
    final gesture = await tester.createGesture(kind: PointerDeviceKind.mouse);
    await gesture.addPointer(location: const Offset(0, 0));
    await gesture.moveTo(tester.getCenter(marqueeFinder));
    await tester.pump();

    expect(state.controller.isAnimating, isFalse);

    // Move mouse away
    await gesture.moveTo(const Offset(900, 900));
    await tester.pump();

    expect(state.controller.isAnimating, isTrue);

    await gesture.removePointer();
  });

  testWidgets('CardMarquee pauses when card hover callback is triggered', (tester) async {
    await tester.pumpWidget(
      buildTestableWidget(
        const CardMarquee(
          cards: [
            Text('Card Alpha'),
            Text('Card Beta'),
          ],
        ),
      ),
    );

    final marqueeFinder = find.byType(CardMarquee);
    final state = tester.state<CardMarqueeState>(marqueeFinder);
    expect(state.controller.isAnimating, isTrue);

    // Simulate card hover notification
    state.handleCardHover(true);
    await tester.pump();
    expect(state.controller.isAnimating, isFalse);

    // Exit card hover
    state.handleCardHover(false);
    await tester.pump();
    expect(state.controller.isAnimating, isTrue);
  });
}
