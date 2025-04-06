<?php

namespace App\Service;

class IdObfuscatorService
{
    // IMPORTANT: For real applications, store this key securely (e.g., environment variable)
    // and ensure it's a long, random string.
    private const XOR_KEY = 'SimpleSecretKeyForQuizmaster'; // Replace with a better key

    public function encode(int $id): string
    {
        $idStr = (string) $id;
        $obfuscated = '';
        $keyLen = strlen(self::XOR_KEY);

        for ($i = 0; $i < strlen($idStr); $i++) {
            $obfuscated .= $idStr[$i] ^ self::XOR_KEY[$i % $keyLen];
        }

        return rtrim(strtr(base64_encode($obfuscated), '+/', '-_'), '='); // URL-safe base64
    }

    public function decode(string $hash): ?int
    {
        try {
            $decodedBase64 = base64_decode(strtr($hash, '-_', '+/'));
            if ($decodedBase64 === false) {
                return null;
            }

            $deobfuscated = '';
            $keyLen = strlen(self::XOR_KEY);

            for ($i = 0; $i < strlen($decodedBase64); $i++) {
                $deobfuscated .= $decodedBase64[$i] ^ self::XOR_KEY[$i % $keyLen];
            }

            if (!is_numeric($deobfuscated)) {
                return null;
            }

            return (int) $deobfuscated;
        } catch (\Throwable $e) {
            // Catch potential errors during decoding
            return null;
        }
    }
}
