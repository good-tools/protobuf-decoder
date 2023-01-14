# protobuf-decoder

Read raw protobuf buffers and return a readable representation of the data

The protobuf encoding format can be found [here](https://developers.google.com/protocol-buffers/docs/encoding).

Demo it on [good.tools](https://good.tools/protobuf-decoder).

## Usage

```javascript
import { decode, simplify } from "@goodtools/protobuf-decoder";

const buf = Buffer.from([
  0x08, 0x8f, 0x81, 0xeb, 0xcf, 0xe0, 0x2a, 0x12, 0x08, 0x6b, 0x6f, 0x74, 0x6c,
  0x69, 0x6e, 0x34, 0x36, 0x3a, 0x05, 0x00, 0x01, 0x03, 0x04, 0x07, 0x42, 0x00,
  0x48, 0xfa, 0x01, 0x55, 0x00, 0x00, 0x48, 0x43, 0x72, 0x0a, 0x0a, 0x08, 0x50,
  0x4f, 0x4b, 0x45, 0x43, 0x4f, 0x49, 0x4e, 0x72, 0x0c, 0x0a, 0x08, 0x53, 0x54,
  0x41, 0x52, 0x44, 0x55, 0x53, 0x54, 0x10, 0x64,
]);

const decoded = decode(buf);
const simplified = simplify(decoded);
const serialized = JSON.stringify(val);
console.log(serialized)
```

### Simplified Representation
A simplified result would only contain the first possible value of a field given its type.

```
00000000  08 8f 81 eb cf e0 2a 12  08 6b 6f 74 6c 69 6e 34  |......*..kotlin4|
00000010  36 3a 05 00 01 03 04 07  42 00 48 fa 01 55 00 00  |6:......B.H..U..|
00000020  48 43 72 0a 0a 08 50 4f  4b 45 43 4f 49 4e 72 0c  |HCr...POKECOINr.|
00000030  0a 08 53 54 41 52 44 55  53 54 10 64              |..STARDUST.d|
0000003c
```

```json
{
  "fields": [
    {
      "field": 1,
      "object": false,
      "type": "varint",
      "value": "1469046243471"
    },
    {
      "field": 2,
      "object": false,
      "type": "len",
      "value": "kotlin46"
    },
    {
      "field": 7,
      "object": false,
      "type": "len",
      "value": "\u0000\u0001\u0003\u0004\u0007"
    },
    {
      "field": 8,
      "object": true,
      "type": "len",
      "value": {
        "fields": [
          
        ]
      }
    },
    {
      "field": 9,
      "object": false,
      "type": "varint",
      "value": "250"
    },
    {
      "field": 10,
      "object": false,
      "type": "i32",
      "value": "1128792064"
    },
    {
      "field": 14,
      "object": true,
      "type": "len",
      "value": {
        "fields": [
          {
            "field": 1,
            "object": false,
            "type": "len",
            "value": "POKECOIN"
          }
        ]
      }
    },
    {
      "field": 14,
      "object": true,
      "type": "len",
      "value": {
        "fields": [
          {
            "field": 1,
            "object": false,
            "type": "len",
            "value": "STARDUST"
          },
          {
            "field": 2,
            "object": false,
            "type": "varint",
            "value": "100"
          }
        ]
      }
    }
  ]
}
```