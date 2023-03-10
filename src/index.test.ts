import { decode, SimpleDecodingResult, simplify } from ".";

const buf = Buffer.from([
  0x08, 0x8f, 0x81, 0xeb, 0xcf, 0xe0, 0x2a, 0x12, 0x08, 0x6b, 0x6f, 0x74, 0x6c,
  0x69, 0x6e, 0x34, 0x36, 0x3a, 0x05, 0x00, 0x01, 0x03, 0x04, 0x07, 0x42, 0x00,
  0x48, 0xfa, 0x01, 0x55, 0x00, 0x00, 0x48, 0x43, 0x72, 0x0a, 0x0a, 0x08, 0x50,
  0x4f, 0x4b, 0x45, 0x43, 0x4f, 0x49, 0x4e, 0x72, 0x0c, 0x0a, 0x08, 0x53, 0x54,
  0x41, 0x52, 0x44, 0x55, 0x53, 0x54, 0x10, 0x64,
]);

describe("decode", () => {
  test("should be able to decode a protobuf correctly", () => {
    const val = decode(buf);

    expect(val.fields[0].value).toBe(BigInt(1469046243471));
  });

  test("simplify converts values to string", () => {
    const val = simplify(decode(buf));

    expect(val.fields[0].value).toBe("1469046243471");
    expect(val.fields[1].value).toBe("kotlin46");

    expect((val.fields[7].value as SimpleDecodingResult).fields[0].value).toBe(
      "STARDUST"
    );
  });

  test("simplify serialization works", () => {
    const val = simplify(decode(buf));
    const serialized = JSON.stringify(val);
    expect(serialized.length).toBeGreaterThan(0);
  });
});
