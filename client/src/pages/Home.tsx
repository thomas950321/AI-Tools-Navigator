import { useState, useMemo } from "react";
import { Search, ExternalLink } from "lucide-react";

interface Tool {
  name: string;
  icon: string;
  category: "Automation" | "Video" | "Slides" | "Audio" | "Productivity";
  slogan: string;
  desc: string;
  url: string;
}

const tools: Tool[] = [
  // Automation
  { name: "n8n", icon: "🤖", category: "Automation", slogan: "工作流自動化的終極利器", desc: "支援自託管與 400+ 服務整合，能構建極其複雜的 AI 自動化工作流。", url: "https://n8n.io" },
  { name: "Gumloop", icon: "➰", category: "Automation", slogan: "專為 AI Agent 設計的無代碼平台", desc: "讓非工程師也能快速串接 LLM 與各種工具，實現自動化數據抓取與處理。", url: "https://www.gumloop.com" },
  { name: "Make", icon: "⚙️", category: "Automation", slogan: "視覺化最強的自動化平台", desc: "擁有最直覺的拖拉介面，適合快速原型設計與多系統間的 AI 串接。", url: "https://www.make.com" },
  { name: "Lindy AI", icon: "👩‍💼", category: "Automation", slogan: "您的全能 AI 個人助理", desc: "自動管理郵件、排定會議並執行跨應用任務，真正釋放雙手。", url: "https://www.lindy.ai" },
  { name: "Relevance AI", icon: "📊", category: "Automation", slogan: "企業級 AI Agent 構建平台", desc: "專注於大規模數據分析與自動化流程，讓企業輕鬆部署專屬 Agent。", url: "https://relevanceai.com" },
  { name: "OpenAI Operator", icon: "🕵️", category: "Automation", slogan: "OpenAI 官方推出的自動化代理", desc: "直接在瀏覽器中為您操作網頁、填寫表格與處理繁瑣任務。", url: "https://openai.com" },

  // Video
  { name: "Sora", icon: "🎬", category: "Video", slogan: "好萊塢等級的文字轉影片", desc: "OpenAI 出品，能生成長達一分鐘的高品質影片，物理模擬與細節驚人。", url: "https://openai.com/sora" },
  { name: "Runway Gen-3", icon: "✨", category: "Video", slogan: "專業影視創作的首選 AI", desc: "提供豐富的控制工具，包含運動筆刷、攝影機控制等，適合專業剪輯師。", url: "https://runwayml.com" },
  { name: "Kling AI", icon: "📽️", category: "Video", slogan: "最強大的物理模擬生成器", desc: "在複雜動作與物理互動上表現卓越，是目前市面上最頂尖的生成工具之一。", url: "https://klingai.com" },
  { name: "Luma Dream Machine", icon: "🌫️", category: "Video", slogan: "極速高品質影片生成", desc: "以驚人的生成速度著稱，且對動作一致性的掌握非常出色。", url: "https://lumalabs.ai/dream-machine" },
  { name: "HeyGen", icon: "👤", category: "Video", slogan: "AI 數位人影片專家", desc: "一鍵生成多國語言的數位人解說影片，適合企業內訓與行銷推廣。", url: "https://www.heygen.com" },
  { name: "Synthesia", icon: "🎭", category: "Video", slogan: "企業級虛擬代言人平台", desc: "提供專業的虛擬主播，讓您無需攝影機與演員即可製作高品質企業影片。", url: "https://www.synthesia.io" },

  // Slides
  { name: "Gamma", icon: "🪄", category: "Slides", slogan: "一鍵生成美觀的簡報與網頁", desc: "輸入一段話，自動完成排版、圖片與內容，簡報製作效率提升 10 倍。", url: "https://gamma.app" },
  { name: "Beautiful.ai", icon: "💎", category: "Slides", slogan: "自動排版的高質感簡報", desc: "智能排版引擎會根據內容自動調整設計，確保每一張投影片都具備專業感。", url: "https://www.beautiful.ai" },
  { name: "Canva Magic", icon: "🎨", category: "Slides", slogan: "全能設計師的 AI 魔法", desc: "整合在 Canva 中的強大 AI 工具，支援自動生成簡報框架與圖像編輯。", url: "https://www.canva.com" },
  { name: "SlidesAI", icon: "📊", category: "Slides", slogan: "Google Slides 的 AI 插件", desc: "直接在您熟悉的 Google 簡報環境中，透過 AI 快速生成內容與結構。", url: "https://www.slidesai.io" },
  { name: "Tome", icon: "📖", category: "Slides", slogan: "敘事型 AI 簡報工具", desc: "專注於說故事的排版風格，適合用於產品演示或創意提案。", url: "https://tome.app" },
  { name: "Pitch", icon: "🚀", category: "Slides", slogan: "現代化團隊協作簡報", desc: "結合強大的 AI 輔助與流暢的團隊協作功能，打造下一代簡報體驗。", url: "https://pitch.com" },

  // Audio
  { name: "Suno", icon: "🎵", category: "Audio", slogan: "一鍵創作出完整專業歌曲", desc: "包含歌詞、旋律與人聲，效果足以媲美串流平台上的專業音樂作品。", url: "https://suno.com" },
  { name: "Udio", icon: "🎧", category: "Audio", slogan: "追求極致音質的 AI 音樂", desc: "在音樂細節與藝術感上表現優異，是音樂製作人的強大靈感助手。", url: "https://www.udio.com" },
  { name: "ElevenLabs", icon: "🗣️", category: "Audio", slogan: "最真實的 AI 語音合成", desc: "提供多國語言、超擬真的人聲克隆，是目前 AI 語音界的業界標準。", url: "https://elevenlabs.io" },
  { name: "AIVA", icon: "🎹", category: "Audio", slogan: "專業級 AI 配樂創作", desc: "專注於樂器編曲，能根據場景需求生成不同情緒的背景音樂。", url: "https://www.aiva.ai" },
  { name: "Murf AI", icon: "🎤", category: "Audio", slogan: "高品質 AI 旁白配音", desc: "提供豐富的配音員選擇，適合用於 Podcast、影片旁白與電子學習。", url: "https://murf.ai" },
  { name: "AudioPod", icon: "📻", category: "Audio", slogan: "全方位 AI 音樂工作室", desc: "集成了多種音訊生成與編輯功能，適合內容創作者的一站式工具。", url: "https://audiopod.ai" },

  // Productivity
  { name: "Perplexity", icon: "🔍", category: "Productivity", slogan: "AI 驅動的對話式搜尋引擎", desc: "取代傳統 Google 搜尋，直接給出附帶來源參考的完整答案。", url: "https://www.perplexity.ai" },
  { name: "Claude", icon: "🧠", category: "Productivity", slogan: "最擅長寫作與邏輯的 AI", desc: "具備極強的推理能力與超長上下文，是處理複雜文件與代碼的最佳拍檔。", url: "https://claude.ai" },
  { name: "Midjourney", icon: "🖼️", category: "Productivity", slogan: "藝術感最強的 AI 繪圖", desc: "生成極具視覺衝擊力的藝術圖像，是目前設計界公認的畫質天花板。", url: "https://www.midjourney.com" },
  { name: "Flux.1", icon: "⚡", category: "Productivity", slogan: "2025 年最強開源繪圖模型", desc: "細節表現驚人，且能完美處理圖像中的文字內容，開源界的 Midjourney。", url: "https://blackforestlabs.ai" },
  { name: "ChatGPT", icon: "💬", category: "Productivity", slogan: "老闆的全能數位助手", desc: "整合搜尋、繪圖、分析與語音對話，是目前功能最全面的 AI 平台。", url: "https://chatgpt.com" },
  { name: "Notion AI", icon: "📝", category: "Productivity", slogan: "筆記軟體中的超級大腦", desc: "直接在筆記中摘要、續寫、改寫與翻譯，大幅提升文書作業效率。", url: "https://www.notion.so" }
];

const categories = [
  { id: "All", label: "全部" },
  { id: "Automation", label: "自動化 & Agent" },
  { id: "Video", label: "影片生成" },
  { id: "Slides", label: "簡報製作" },
  { id: "Audio", label: "音樂音效" },
  { id: "Productivity", label: "生產力 & 圖像" }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.slogan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.desc.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
        <div className="container py-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 bg-gradient-to-b from-foreground to-muted bg-clip-text text-transparent">
              AI Tools Navigator
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              2025-2026 年最熱門、真正好用的 AI 工具精選導航
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative group">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="搜尋工具名稱或功能..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-card border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border/50 text-foreground hover:border-border"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        {filteredTools.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">找不到符合條件的工具...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <div
                key={tool.name}
                className="group bg-card border border-border/50 rounded-xl p-6 hover:border-border/80 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{tool.icon}</div>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {categories.find(c => c.id === tool.category)?.label}
                  </span>
                </div>

                {/* Title & Slogan */}
                <h3 className="text-lg font-semibold text-foreground mb-1">{tool.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">{tool.slogan}</p>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow mb-6">
                  {tool.desc}
                </p>

                {/* CTA Button */}
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 font-medium transition-all group-hover:gap-3"
                >
                  前往官網
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20 py-8 text-center text-muted-foreground text-sm">
        <p>AI Tools Navigator © 2026 | 精心篩選最熱門的 AI 工具</p>
      </footer>
    </div>
  );
}
