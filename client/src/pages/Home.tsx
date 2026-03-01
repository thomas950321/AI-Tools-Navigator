import { useState, useMemo } from "react";
import { Search, ExternalLink } from "lucide-react";

interface Tool {
  name: string;
  icon: string;
  category: "Automation" | "Video" | "Slides" | "Audio" | "Productivity" | "Code" | "Research" | "3D" | "Customer" | "Testing" | "Labeling" | "Legal" | "Education" | "Translation" | "Marketing" | "General" | "Writing";
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
  { name: "Zapier", icon: "⚡", category: "Automation", slogan: "連接 5000+ 應用的自動化平台", desc: "無需代碼即可創建複雜的工作流，連接所有您常用的應用。", url: "https://zapier.com" },

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
  { name: "Notion AI", icon: "📝", category: "Productivity", slogan: "筆記軟體中的超級大腦", desc: "直接在筆記中摘要、續寫、改寫與翻譯，大幅提升文書作業效率。", url: "https://www.notion.so" },

  // Code
  { name: "Cursor", icon: "💻", category: "Code", slogan: "最強的 AI 代碼編輯器", desc: "結合 AI 的強大代碼編輯器，能自動完成複雜編程任務與重構。", url: "https://www.cursor.com" },
  { name: "GitHub Copilot", icon: "🐙", category: "Code", slogan: "GitHub 官方 AI 編程助手", desc: "在 VS Code 中提供實時代碼建議，大幅加速開發效率。", url: "https://github.com/features/copilot" },
  { name: "Lovable", icon: "💕", category: "Code", slogan: "無需代碼即可構建 Web 應用", desc: "用自然語言描述需求，AI 自動生成完整的 Web 應用代碼。", url: "https://lovable.dev" },
  { name: "Replit", icon: "🔄", category: "Code", slogan: "雲端 IDE 與 AI 代碼生成", desc: "在瀏覽器中編寫、執行和部署代碼，內建 AI 代碼生成功能。", url: "https://replit.com" },
  { name: "v0", icon: "🎯", category: "Code", slogan: "Vercel 推出的 AI UI 生成工具", desc: "用文字描述 UI 設計，AI 自動生成 React 組件代碼。", url: "https://v0.dev" },
  { name: "Windsurf", icon: "🌬️", category: "Code", slogan: "新一代 AI 代碼編輯器", desc: "提供更智能的代碼補全與重構建議，適合全棧開發。", url: "https://codeium.com/windsurf" },

  // Research
  { name: "NotebookLM", icon: "📚", category: "Research", slogan: "Google 推出的深度文件研究助手", desc: "上傳文件後自動生成摘要、問答與深度分析，是研究人員的必備工具。", url: "https://notebooklm.google.com" },
  { name: "Consensus", icon: "🏆", category: "Research", slogan: "學術論文 AI 搜尋引擎", desc: "搜尋學術論文並自動提取關鍵結論，適合學術研究與文獻回顧。", url: "https://consensus.app" },
  { name: "Elicit", icon: "🔬", category: "Research", slogan: "AI 研究論文分析工具", desc: "快速分析大量研究論文，提取重要發現與數據，加速研究進度。", url: "https://elicit.com" },
  { name: "Genspark", icon: "✨", category: "Research", slogan: "多維度 AI 搜尋與研究", desc: "提供多角度的搜尋結果與深度分析，是探索複雜話題的最佳工具。", url: "https://www.genspark.ai" },
  { name: "Julius.ai", icon: "📈", category: "Research", slogan: "數據分析與統計 AI 助手", desc: "上傳數據後自動進行統計分析、可視化與預測，適合數據科學家。", url: "https://julius.ai" },

  // 3D
  { name: "Meshy", icon: "🎲", category: "3D", slogan: "最強的 AI 3D 模型生成", desc: "文字或圖像轉 3D 模型，生成遊戲級別的高品質資產。", url: "https://www.meshy.ai" },
  { name: "Tripo3D", icon: "🔷", category: "3D", slogan: "快速 3D 模型生成工具", desc: "秒級生成高品質 3D 模型，適合快速原型設計與視覺化。", url: "https://www.tripo3d.ai" },
  { name: "Spline", icon: "🌐", category: "3D", slogan: "3D 設計與協作平台", desc: "在瀏覽器中設計 3D 模型與動畫，支援團隊實時協作。", url: "https://spline.design" },
  { name: "Adobe Firefly", icon: "🔥", category: "3D", slogan: "Adobe 官方 AI 生成工具", desc: "在 Adobe Creative Cloud 中使用 AI 生成圖像、文字與 3D 效果。", url: "https://firefly.adobe.com" },
  { name: "Figma AI", icon: "🎨", category: "3D", slogan: "設計工具中的 AI 助手", desc: "在 Figma 中使用 AI 自動生成設計、排版與原型。", url: "https://figma.com" },

  // Customer Service
  { name: "Intercom", icon: "💬", category: "Customer", slogan: "AI 客服與對話平台", desc: "整合客服、行銷與產品工具，提供 AI 驅動的客戶支持。", url: "https://www.intercom.com" },
  { name: "Zendesk AI", icon: "🛠️", category: "Customer", slogan: "企業級客服 AI 解決方案", desc: "自動化客服工作流，提升回應速度與客戶滿意度。", url: "https://www.zendesk.com" },
  { name: "Ada", icon: "🤖", category: "Customer", slogan: "AI 客服機器人平台", desc: "無需代碼即可構建智能客服機器人，支援多語言與多渠道。", url: "https://www.ada.support" },
  { name: "Kustomer", icon: "👥", category: "Customer", slogan: "全渠道 AI 客服 CRM", desc: "統一管理所有客戶互動，AI 自動分類與回應客服工單。", url: "https://www.kustomer.com" },

  // Testing
  { name: "Mabl", icon: "🧪", category: "Testing", slogan: "AI 低代碼測試自動化", desc: "從屏幕錄製自動生成測試用例，無需編寫複雜代碼。", url: "https://www.mabl.com" },
  { name: "Testim", icon: "✅", category: "Testing", slogan: "自我修復的 AI 測試工具", desc: "AI 自動修復失敗的測試，減少維護成本與測試時間。", url: "https://www.testim.io" },
  { name: "Applitools", icon: "👁️", category: "Testing", slogan: "AI 視覺測試平台", desc: "自動檢測 UI 變化與視覺缺陷，確保跨瀏覽器兼容性。", url: "https://applitools.com" },
  { name: "QA Wolf", icon: "🐺", category: "Testing", slogan: "自動化測試代碼生成", desc: "自動生成可維護的 E2E 測試代碼，加速 QA 流程。", url: "https://www.qawolf.com" },

  // Data Labeling
  { name: "Scale AI", icon: "📐", category: "Labeling", slogan: "企業級數據標註平台", desc: "大規模數據標註與質量控制，支援 RLHF 與模型評估。", url: "https://scale.com" },
  { name: "Labelbox", icon: "📦", category: "Labeling", slogan: "機器學習數據標註工具", desc: "靈活的數據標註工作流，支援圖像、文字與視頻標註。", url: "https://labelbox.com" },
  { name: "SuperAnnotate", icon: "🏷️", category: "Labeling", slogan: "AI 輔助數據標註", desc: "AI 自動標註與質量檢查，大幅加速標註效率。", url: "https://www.superannotate.com" },

  // Legal
  { name: "Spellbook", icon: "⚖️", category: "Legal", slogan: "AI 法律文件起草工具", desc: "在 Word 中使用 AI 起草與審查法律文件，確保準確性。", url: "https://www.spellbook.legal" },
  { name: "Lexis+ AI", icon: "📜", category: "Legal", slogan: "法律研究與起草 AI", desc: "基於 LexisNexis 法律數據庫的 AI 研究與起草工具。", url: "https://www.lexisnexis.com" },
  { name: "LEGALFLY", icon: "✏️", category: "Legal", slogan: "法律文件編輯 AI 助手", desc: "在 Word 中自動編輯與優化法律文件，支援多國法律。", url: "https://www.legalfly.com" },

  // Education
  { name: "Khan Academy Khanmigo", icon: "🎓", category: "Education", slogan: "AI 私人家教", desc: "AI 驅動的個性化學習助手，支援多科目與多語言。", url: "https://www.khanacademy.org" },
  { name: "Duolingo Max", icon: "🦉", category: "Education", slogan: "語言學習 AI 助手", desc: "使用 GPT 提供個性化語言學習與實時糾正。", url: "https://www.duolingo.com" },
  { name: "Outschool AI", icon: "👨‍🏫", category: "Education", slogan: "線上教育 AI 平台", desc: "連接學生與教師的平台，整合 AI 個性化學習功能。", url: "https://outschool.com" },

  // Translation
  { name: "DeepL", icon: "🌍", category: "Translation", slogan: "最高品質的 AI 翻譯", desc: "在歐洲語言翻譯上表現最佳，保留原文風格與含義。", url: "https://www.deepl.com" },
  { name: "Google Translate", icon: "🗣️", category: "Translation", slogan: "全球最廣泛的翻譯工具", desc: "支援 100+ 語言，適合快速翻譯與多語言內容。", url: "https://translate.google.com" },

  // Marketing
  { name: "Semrush", icon: "📊", category: "Marketing", slogan: "企業級 AI SEO 平台", desc: "完整的 SEO、內容行銷與競爭分析工具，內建 AI 優化建議。", url: "https://semrush.com" },
  { name: "Jasper", icon: "✍️", category: "Marketing", slogan: "AI 內容行銷助手", desc: "快速生成高品質行銷文案、部落格文章與社群內容。", url: "https://www.jasper.ai" },
  { name: "Surfer SEO", icon: "🏄", category: "Marketing", slogan: "AI 內容優化工具", desc: "分析排名靠前的內容，AI 自動優化您的文章以提升排名。", url: "https://surferseo.com" },
  { name: "Copysmith", icon: "📝", category: "Marketing", slogan: "AI 文案生成工具", desc: "為電商、廣告與行銷生成高轉化率的文案。", url: "https://www.copysmith.ai" },

  // General Purpose
  { name: "Manus", icon: "🦾", category: "General", slogan: "通用目的 AI 代理", desc: "能執行任何任務的通用 AI 代理，從研究到開發再到自動化。", url: "https://manus.im" },
  { name: "Gemini", icon: "💎", category: "General", slogan: "Google 最強 AI 助手", desc: "多模態 AI 助手，擅長圖像、視頻與文字理解。", url: "https://gemini.google.com" },
  { name: "Grok", icon: "🧠", category: "General", slogan: "X 官方 AI 助手", desc: "實時信息訪問的 AI 助手，適合快速查詢與分析。", url: "https://grok.x.ai" },
  { name: "Skywork", icon: "☁️", category: "General", slogan: "新興的中文 AI 模型", desc: "專為中文優化的高性能 AI 模型，適合中文內容生成。", url: "https://www.skywork.ai" },

  // Writing
  { name: "MiniMax", icon: "📄", category: "Writing", slogan: "高效能中文 AI 模型", desc: "快速且準確的中文文本生成，適合內容創作與翻譯。", url: "https://www.minimaxi.com" },
  { name: "AlStudio", icon: "🎭", category: "Writing", slogan: "AI 創意寫作工具", desc: "協助創意寫作、故事構思與文學創作的 AI 平台。", url: "https://www.alstudio.ai" },
  { name: "Grammarly", icon: "✓", category: "Writing", slogan: "AI 文法與寫作助手", desc: "實時檢查文法、拼寫與風格，提升寫作品質。", url: "https://www.grammarly.com" },
  { name: "Copyscape", icon: "🔍", category: "Writing", slogan: "AI 內容檢測工具", desc: "檢測內容重複與抄襲，確保內容原創性。", url: "https://www.copyscape.com" }
];

const categories = [
  { id: "All", label: "全部" },
  { id: "Automation", label: "自動化 & Agent" },
  { id: "Video", label: "影片生成" },
  { id: "Slides", label: "簡報製作" },
  { id: "Audio", label: "音樂音效" },
  { id: "Productivity", label: "生產力 & 圖像" },
  { id: "Code", label: "代碼生成" },
  { id: "Research", label: "研究與分析" },
  { id: "3D", label: "3D & 設計" },
  { id: "Customer", label: "客服機器人" },
  { id: "Testing", label: "測試與 QA" },
  { id: "Labeling", label: "數據標註" },
  { id: "Legal", label: "法律文件" },
  { id: "Education", label: "教育學習" },
  { id: "Translation", label: "翻譯工具" },
  { id: "Marketing", label: "行銷 & SEO" },
  { id: "General", label: "通用 AI 助手" },
  { id: "Writing", label: "寫作工具" }
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
              2025-2026 年最熱門、真正好用的 AI 工具精選導航 | 78+ 工具 | 17+ 分類
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
          <div className="flex flex-wrap justify-center gap-2 max-h-32 overflow-y-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
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
        <div className="text-center mb-8">
          <p className="text-muted-foreground">
            找到 <span className="text-primary font-semibold">{filteredTools.length}</span> 個工具
          </p>
        </div>

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
        <p>AI Tools Navigator © 2026 | 精心篩選最熱門的 AI 工具 | 78+ 工具 | 17+ 分類</p>
      </footer>
    </div>
  );
}
