https://cotd2048.herokuapp.com/console/api-explorer


INSERT FISH - into mag database and returning rows as required.

mutation insert_mag($objects: [mag_insert_input!]! ) {
  insert_mag(objects: $objects) {
    returning {
      _id_2
      name
    }
  }
}


{
  "objects": [
    {
      "_id": "fishes",
      "_id_2": "fish12",
      "name": "Article 1",
      "desc": "Sample article content",
      "price": 3
    }
  ]
}
