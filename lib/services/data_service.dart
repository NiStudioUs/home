import 'dart:convert';
import 'package:flutter/services.dart';
import '../models/data_model.dart';

class DataService {
  Future<DataModel> loadData() async {
    final String response = await rootBundle.loadString('assets/data.json');
    final data = await json.decode(response);
    return DataModel.fromJson(data);
  }
}
