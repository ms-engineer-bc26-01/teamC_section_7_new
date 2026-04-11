"use client"; // Next.jsのApp Routerで状態管理やイベントを使う場合に必要

import { Box, Heading, Textarea, Button, VStack, SimpleGrid, Icon } from "@chakra-ui/react";
import { useState } from "react";

export default function RecordPage() {
  // 選択された天気を管理する状態（後ほどAPIと連携）
  const [selectedWeather, setSelectedWeather] = useState<string | null>(null);

  return (
    <Box p={8} maxWidth="500px" mx="auto">
      <VStack gap={6} align="stretch">
        {/* ページタイトル */}
        <Heading size="md" textAlign="center">
          今日の「こころの天気」は？
        </Heading>
        
        {/* 天気アイコン選択エリア：児童が直感的に選べるようにSimpleGridを使用 */}
        <SimpleGrid columns={4} gap={4}>
          {/* ここに天気アイコンコンポーネントを配置 */}
          {["☀️", "☁️", "☔", "⚡"].map((emoji) => (
            <Button
              key={emoji}
              variant={selectedWeather === emoji ? "solid" : "outline"}
              colorScheme="orange"
              onClick={() => setSelectedWeather(emoji)}
              fontSize="2xl"
              height="60px"
            >
              {emoji}
            </Button>
          ))}
        </SimpleGrid>

        {/* コメント入力エリア：任意入力 */}
        <Textarea 
          placeholder="今の気持ちを教えてね（書かなくても大丈夫だよ）" 
          size="md"
          rows={5}
          _focus={{ borderColor: "blue.400" }}
        />
        
        {/* 登録ボタン：API担当と連携してonClick処理を実装予定 */}
        <Button 
          colorScheme="blue" 
          size="lg" 
          width="full"
          disabled={!selectedWeather} // 天気が選ばれていない時は押せない
        >
          記録する
        </Button>
      </VStack>
    </Box>
  );
}