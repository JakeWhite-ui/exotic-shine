"""Decode the studio's Google plus code into lat/lng.

The Google Business Profile lists the location as "59JJ+7G Dubai". That's a
short Open Location Code, resolved against a Dubai reference point, and it
gives us the real pin for Warehouse 09 instead of the approximate one that
was sitting in business.ts with a TODO on it.
"""

ALPHABET = "23456789CFGHJMPQRVWX"
SEP = "+"

# Rough centre of Dubai, used to recover the omitted prefix of the short code.
REF_LAT, REF_LNG = 25.2048, 55.2708


def decode(code: str):
    code = code.replace(SEP, "")
    lat = -90.0
    lng = -180.0
    lat_res = 400.0
    lng_res = 400.0

    for i in range(0, len(code), 2):
        lat_res /= 20
        lng_res /= 20
        lat += lat_res * ALPHABET.index(code[i])
        lng += lng_res * ALPHABET.index(code[i + 1])

    return lat + lat_res / 2, lng + lng_res / 2


def recover(short: str, ref_lat: float, ref_lng: float):
    """Rebuild the full 10-character code from a 6-character short one."""
    padding = 8 - short.index(SEP)
    # Snap the reference down to the resolution the prefix encodes.
    res = 20.0 ** (2 - (padding / 2))
    half = res / 2

    prefix_lat = int((ref_lat + 90) / res) * res - 90
    prefix_lng = int((ref_lng + 180) / res) * res - 180

    full = encode(prefix_lat, prefix_lng, padding) + short
    lat, lng = decode(full)

    # The short code is ambiguous by one cell; pick the candidate closest to
    # the reference.
    while lat - ref_lat > half:
        lat -= res
    while ref_lat - lat > half:
        lat += res
    while lng - ref_lng > half:
        lng -= res
    while ref_lng - lng > half:
        lng += res

    return full, lat, lng


def encode(lat: float, lng: float, length: int):
    lat_val = int((lat + 90) * 8000 * 20 * 20)
    lng_val = int((lng + 180) * 8000 * 20 * 20)
    out = ""
    for i in range(length // 2):
        div = 20 ** (4 - i)
        out += ALPHABET[(lat_val // (8000 * div // 400)) % 20] if False else ""
    # Simpler: build digit by digit from the top.
    out = ""
    lat_rem = lat + 90
    lng_rem = lng + 180
    lat_res = 400.0
    lng_res = 400.0
    for _ in range(length // 2):
        lat_res /= 20
        lng_res /= 20
        d_lat = int(lat_rem / lat_res)
        d_lng = int(lng_rem / lng_res)
        lat_rem -= d_lat * lat_res
        lng_rem -= d_lng * lng_res
        out += ALPHABET[d_lat] + ALPHABET[d_lng]
    return out


full, lat, lng = recover("59JJ+7G", REF_LAT, REF_LNG)
print("full code:", full)
print(f"lat: {lat:.6f}")
print(f"lng: {lng:.6f}")
print(f"maps: https://www.google.com/maps?q={lat:.6f},{lng:.6f}")
