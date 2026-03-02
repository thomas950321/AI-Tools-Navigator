import { useState, useMemo } from "react";
import * as React from "react";
import { Search, ExternalLink } from "lucide-react";

interface Tool {
  name: string;
  logo: string;
  category: "Automation" | "Video" | "Slides" | "Audio" | "Productivity" | "Code" | "Research" | "3D" | "Customer" | "Testing" | "Labeling" | "Legal" | "Education" | "Translation" | "Marketing" | "General" | "Writing" | "MindMap" | "VideoEdit" | "Design" | "ContentCreation" | "ProjectManagement" | "Other" | "MarketingContent" | "MarketingAnalytics" | "MarketingSearch" | "MarketingGraphics" | "MarketingShortVideo" | "MarketingVideoEdit" | "MarketingAvatar" | "MarketingWorkflow" | "MarketingAds"
  slogan: string;
  desc: string;
  url: string;
}

const tools: Tool[] = [
  // Automation
  { name: "n8n", logo: "https://n8n.io/favicon.ico", category: "Automation", slogan: "工作流自動化的終極利器", desc: "支援自託管與 400+ 服務整合，能構建極其複雜的 AI 自動化工作流。", url: "https://n8n.io" },
  { name: "Gumloop", logo: "https://www.gumloop.com/favicon.ico", category: "Automation", slogan: "專為 AI Agent 設計的無代碼平台", desc: "讓非工程師也能快速串接 LLM 與各種工具，實現自動化數據抓取與處理。", url: "https://www.gumloop.com" },
  { name: "Make", logo: "https://www.make.com/favicon.ico", category: "Automation", slogan: "視覺化最強的自動化平台", desc: "擁有最直覺的拖拉介面，適合快速原型設計與多系統間的 AI 串接。", url: "https://www.make.com" },
  { name: "Lindy AI", logo: "https://www.lindy.ai/favicon.ico", category: "Automation", slogan: "您的全能 AI 個人助理", desc: "自動管理郵件、排定會議並執行跨應用任務，真正釋放雙手。", url: "https://www.lindy.ai" },
  { name: "Relevance AI", logo: "https://relevanceai.com/favicon.ico", category: "Automation", slogan: "企業級 AI Agent 構建平台", desc: "專注於大規模數據分析與自動化流程，讓企業輕鬆部署專屬 Agent。", url: "https://relevanceai.com" },
  { name: "OpenAI Operator", logo: "https://openai.com/favicon.ico", category: "Automation", slogan: "OpenAI 官方推出的自動化代理", desc: "直接在瀏覽器中為您操作網頁、填寫表格與處理繁瑣任務。", url: "https://openai.com" },
  { name: "Zapier", logo: "https://zapier.com/favicon.ico", category: "Automation", slogan: "連接 5000+ 應用的自動化平台", desc: "無需代碼即可創建複雜的工作流，連接所有您常用的應用。", url: "https://zapier.com" },

  // Video
  { name: "Sora", logo: "https://openai.com/favicon.ico", category: "Video", slogan: "好萊塢等級的文字轉影片", desc: "OpenAI 出品，能生成長達一分鐘的高品質影片，物理模擬與細節驚人。", url: "https://openai.com/sora" },
  { name: "Runway Gen-3", logo: "https://runwayml.com/favicon.ico", category: "Video", slogan: "專業影視創作的首選 AI", desc: "提供豐富的控制工具，包含運動筆刷、攝影機控制等，適合專業剪輯師。", url: "https://runwayml.com" },
  { name: "Kling AI", logo: "https://klingai.com/favicon.ico", category: "Video", slogan: "最強大的物理模擬生成器", desc: "在複雜動作與物理互動上表現卓越，是目前市面上最頂尖的生成工具之一。", url: "https://klingai.com" },
  { name: "Luma Dream Machine", logo: "https://lumalabs.ai/favicon.ico", category: "Video", slogan: "極速高品質影片生成", desc: "以驚人的生成速度著稱，且對動作一致性的掌握非常出色。", url: "https://lumalabs.ai/dream-machine" },
  { name: "HeyGen", logo: "https://www.heygen.com/favicon.ico", category: "Video", slogan: "AI 數位人影片專家", desc: "一鍵生成多國語言的數位人解說影片，適合企業內訓與行銷推廣。", url: "https://www.heygen.com" },
  { name: "Synthesia", logo: "https://www.synthesia.io/favicon.ico", category: "Video", slogan: "企業級虛擬代言人平台", desc: "提供專業的虛擬主播，讓您無需攝影機與演員即可製作高品質企業影片。", url: "https://www.synthesia.io" },
  { name: "FlexClip", logo: "https://flexclip.com/favicon.ico", category: "Video", slogan: "快速生成高品質短影片", desc: "輸入文字或網址即可快速生成影片，免費版可輸出 10 分鐘片長。", url: "https://flexclip.com" },
  { name: "Pika", logo: "https://pika.art/favicon.ico", category: "Video", slogan: "無腦上傳圖片變影片", desc: "上傳圖片即可自動生成動畫影片，無需複雜操作。", url: "https://pika.art" },
  { name: "King AI", logo: "https://klingai.com/favicon.ico", category: "Video", slogan: "塗抹照片動起來", desc: "塗抹照片局部就可以動起來，還可以加上移動路徑。", url: "https://klingai.com" },
  { name: "PixVerse", logo: "https://pixverse.ai/favicon.ico", category: "Video", slogan: "創意特效影片生成", desc: "製作擁抱、接吻、猛毒、打拳擊等特效影片，創意無限。", url: "https://pixverse.ai" },
  { name: "海螺", logo: "https://www.heluai.com/favicon.ico", category: "Video", slogan: "照片文字快速生成短片", desc: "照片加文字快速生成意想不到的超展開短片。", url: "https://www.heluai.com" },
  { name: "Vidu", logo: "https://www.vidu.ai/favicon.ico", category: "Video", slogan: "無違和視頻生成", desc: "上傳參考圖片搭配文字馬上生成無違和視頻。", url: "https://www.vidu.ai" },
  { name: "Vidful", logo: "https://vidful.ai/favicon.ico", category: "Video", slogan: "Sora 平替超擬真短片", desc: "超擬真高質感短片，有文字、圖片就能生成。", url: "https://vidful.ai" },

  // Slides
  { name: "Gamma", logo: "https://gamma.app/favicon.ico", category: "Slides", slogan: "一鍵生成美觀的簡報與網頁", desc: "輸入一段話，自動完成排版、圖片與內容，簡報製作效率提升 10 倍。", url: "https://gamma.app" },
  { name: "Beautiful.ai", logo: "https://www.beautiful.ai/favicon.ico", category: "Slides", slogan: "自動排版的高質感簡報", desc: "智能排版引擎會根據內容自動調整設計，確保每一張投影片都具備專業感。", url: "https://www.beautiful.ai" },
  { name: "Canva Magic", logo: "https://www.canva.com/favicon.ico", category: "Slides", slogan: "全能設計師的 AI 魔法", desc: "整合在 Canva 中的強大 AI 工具，支援自動生成簡報框架與圖像編輯。", url: "https://www.canva.com" },
  { name: "SlidesAI", logo: "https://www.slidesai.io/favicon.ico", category: "Slides", slogan: "Google Slides 的 AI 插件", desc: "直接在您熟悉的 Google 簡報環境中，透過 AI 快速生成內容與結構。", url: "https://www.slidesai.io" },
  { name: "Tome", logo: "https://tome.app/favicon.ico", category: "Slides", slogan: "敘事型 AI 簡報工具", desc: "專注於說故事的排版風格，適合用於產品演示或創意提案。", url: "https://tome.app" },
  { name: "Pitch", logo: "https://pitch.com/favicon.ico", category: "Slides", slogan: "現代化團隊協作簡報", desc: "結合強大的 AI 輔助與流暢的團隊協作功能，打造下一代簡報體驗。", url: "https://pitch.com" },
  { name: "Slidesgo", logo: "https://slidesgo.com/favicon.ico", category: "Slides", slogan: "高質感簡報與圖庫", desc: "不僅生成高質感簡報，還有大量圖庫、AI 轉圖片功能。", url: "https://slidesgo.com" },
  { name: "Kimi", logo: "https://kimi.ai/favicon.ico", category: "Slides", slogan: "生成簡報大綱與 PPT", desc: "不只生成簡報大綱，連質感 PPT 都做好，可以免費下載檔案。", url: "https://kimi.ai" },
  { name: "Brisk Teaching", logo: "https://www.briskteaching.com/favicon.ico", category: "Slides", slogan: "影片轉簡報工具", desc: "影片也能轉成 PPT，用瀏覽器擴充一鍵把 YouTube 做成簡報。", url: "https://www.briskteaching.com" },

  // Audio
  { name: "Suno", logo: "https://suno.com/favicon.ico", category: "Audio", slogan: "一鍵創作出完整專業歌曲", desc: "包含歌詞、旋律與人聲，效果足以媲美串流平台上的專業音樂作品。", url: "https://suno.com" },
  { name: "Udio", logo: "https://www.udio.com/favicon.ico", category: "Audio", slogan: "追求極致音質的 AI 音樂", desc: "在音樂細節與藝術感上表現優異，是音樂製作人的強大靈感助手。", url: "https://www.udio.com" },
  { name: "ElevenLabs", logo: "https://elevenlabs.io/favicon.ico", category: "Audio", slogan: "最真實的 AI 語音合成", desc: "提供多國語言、超擬真的人聲克隆，是目前 AI 語音界的業界標準。", url: "https://elevenlabs.io" },
  { name: "AIVA", logo: "https://www.aiva.ai/favicon.ico", category: "Audio", slogan: "專業級 AI 配樂創作", desc: "專注於樂器編曲，能根據場景需求生成不同情緒的背景音樂。", url: "https://www.aiva.ai" },
  { name: "Murf AI", logo: "https://murf.ai/favicon.ico", category: "Audio", slogan: "高品質 AI 旁白配音", desc: "提供豐富的配音員選擇，適合用於 Podcast、影片旁白與電子學習。", url: "https://murf.ai" },
  { name: "AudioPod", logo: "https://audiopod.ai/favicon.ico", category: "Audio", slogan: "全方位 AI 音樂工作室", desc: "集成了多種音訊生成與編輯功能，適合內容創作者的一站式工具。", url: "https://audiopod.ai" },
  { name: "Fish Audio", logo: "https://fish.audio/favicon.ico", category: "Audio", slogan: "名人聲音文字轉語音", desc: "把您的文字讓名人聲音說出來，也能自己新增聲音。", url: "https://fish.audio" },
  { name: "Hedra", logo: "https://www.hedra.com/favicon.ico", category: "Audio", slogan: "AI 數位人說話唱歌", desc: "上傳人物照片，輸入台詞或音檔，讓他開口說話唱歌。", url: "https://www.hedra.com" },
  { name: "即夢", logo: "https://jimeng.io/favicon.ico", category: "Audio", slogan: "AI 對嘴同步工具", desc: "上傳音檔就可以幫圖片中的人物完美對嘴。", url: "https://jimeng.io" },

  // Productivity
  { name: "Perplexity", logo: "https://www.perplexity.ai/favicon.ico", category: "Productivity", slogan: "AI 驅動的對話式搜尋引擎", desc: "取代傳統 Google 搜尋，直接給出附帶來源參考的完整答案。", url: "https://www.perplexity.ai" },
  { name: "Claude", logo: "https://claude.ai/favicon.ico", category: "Productivity", slogan: "最擅長寫作與邏輯的 AI", desc: "具備極強的推理能力與超長上下文，是處理複雜文件與代碼的最佳拍檔。", url: "https://claude.ai" },
  { name: "Midjourney", logo: "https://www.midjourney.com/favicon.ico", category: "Productivity", slogan: "藝術感最強的 AI 繪圖", desc: "生成極具視覺衝擊力的藝術圖像，是目前設計界公認的畫質天花板。", url: "https://www.midjourney.com" },
  { name: "Flux.1", logo: "https://blackforestlabs.ai/favicon.ico", category: "Productivity", slogan: "2025 年最強開源繪圖模型", desc: "細節表現驚人，且能完美處理圖像中的文字內容，開源界的 Midjourney。", url: "https://blackforestlabs.ai" },
  { name: "ChatGPT", logo: "https://chatgpt.com/favicon.ico", category: "Productivity", slogan: "老闆的全能數位助手", desc: "整合搜尋、繪圖、分析與語音對話，是目前功能最全面的 AI 平台。", url: "https://chatgpt.com" },
  { name: "Notion AI", logo: "https://www.notion.so/favicon.ico", category: "Productivity", slogan: "筆記軟體中的超級大腦", desc: "直接在筆記中摘要、續寫、改寫與翻譯，大幅提升文書作業效率。", url: "https://www.notion.so" },

  // Code
  { name: "Cursor", logo: "https://www.cursor.com/favicon.ico", category: "Code", slogan: "最強的 AI 代碼編輯器", desc: "結合 AI 的強大代碼編輯器，能自動完成複雜編程任務與重構。", url: "https://www.cursor.com" },
  { name: "GitHub Copilot", logo: "https://github.com/favicon.ico", category: "Code", slogan: "GitHub 官方 AI 編程助手", desc: "在 VS Code 中提供實時代碼建議，大幅加速開發效率。", url: "https://github.com/features/copilot" },
  { name: "Lovable", logo: "https://lovable.dev/favicon.ico", category: "Code", slogan: "無需代碼即可構建 Web 應用", desc: "用自然語言描述需求，AI 自動生成完整的 Web 應用代碼。", url: "https://lovable.dev" },
  { name: "Replit", logo: "https://replit.com/favicon.ico", category: "Code", slogan: "雲端 IDE 與 AI 代碼生成", desc: "在瀏覽器中編寫、執行和部署代碼，內建 AI 代碼生成功能。", url: "https://replit.com" },
  { name: "v0", logo: "https://v0.dev/favicon.ico", category: "Code", slogan: "Vercel 推出的 AI UI 生成工具", desc: "用文字描述 UI 設計，AI 自動生成 React 組件代碼。", url: "https://v0.dev" },
  { name: "Windsurf", logo: "https://codeium.com/favicon.ico", category: "Code", slogan: "新一代 AI 代碼編輯器", desc: "提供更智能的代碼補全與重構建議，適合全棧開發。", url: "https://codeium.com/windsurf" },

  // Research
  { name: "NotebookLM", logo: "https://notebooklm.google.com/favicon.ico", category: "Research", slogan: "Google 推出的深度文件研究助手", desc: "上傳文件後自動生成摘要、問答與深度分析，是研究人員的必備工具。", url: "https://notebooklm.google.com" },
  { name: "Consensus", logo: "https://consensus.app/favicon.ico", category: "Research", slogan: "學術論文 AI 搜尋引擎", desc: "搜尋學術論文並自動提取關鍵結論，適合學術研究與文獻回顧。", url: "https://consensus.app" },
  { name: "Elicit", logo: "https://elicit.com/favicon.ico", category: "Research", slogan: "AI 研究論文分析工具", desc: "快速分析大量研究論文，提取重要發現與數據，加速研究進度。", url: "https://elicit.com" },
  { name: "Genspark", logo: "https://www.genspark.ai/favicon.ico", category: "Research", slogan: "多維度 AI 搜尋與研究", desc: "提供多角度的搜尋結果與深度分析，是探索複雜話題的最佳工具。", url: "https://www.genspark.ai" },
  { name: "Julius.ai", logo: "https://julius.ai/favicon.ico", category: "Research", slogan: "數據分析與統計 AI 助手", desc: "上傳數據後自動進行統計分析、可視化與預測，適合數據科學家。", url: "https://julius.ai" },
  { name: "Arc", logo: "https://arc.net/favicon.ico", category: "Research", slogan: "整合 AI 的瀏覽器", desc: "自動總結網頁資訊，省去自己爬資料的麻煩。", url: "https://arc.net" },
  { name: "BiLin", logo: "https://bilin.ai/favicon.ico", category: "Research", slogan: "跨國網站搜尋與翻譯", desc: "跨國搜尋您指定的外國網站，網頁還自動翻譯成您的語言。", url: "https://bilin.ai" },

  // 3D
  { name: "Meshy", logo: "https://www.meshy.ai/favicon.ico", category: "3D", slogan: "最強的 AI 3D 模型生成", desc: "文字或圖像轉 3D 模型，生成遊戲級別的高品質資產。", url: "https://www.meshy.ai" },
  { name: "Tripo3D", logo: "https://www.tripo3d.ai/favicon.ico", category: "3D", slogan: "快速 3D 模型生成工具", desc: "秒級生成高品質 3D 模型，適合快速原型設計與視覺化。", url: "https://www.tripo3d.ai" },
  { name: "Spline", logo: "https://spline.design/favicon.ico", category: "3D", slogan: "3D 設計與協作平台", desc: "在瀏覽器中設計 3D 模型與動畫，支援團隊實時協作。", url: "https://spline.design" },
  { name: "Adobe Firefly", logo: "https://firefly.adobe.com/favicon.ico", category: "3D", slogan: "Adobe 官方 AI 生成工具", desc: "在 Adobe Creative Cloud 中使用 AI 生成圖像、文字與 3D 效果。", url: "https://firefly.adobe.com" },
  { name: "Figma AI", logo: "https://figma.com/favicon.ico", category: "3D", slogan: "設計工具中的 AI 助手", desc: "在 Figma 中使用 AI 自動生成設計、排版與原型。", url: "https://figma.com" },

  // MindMap
  { name: "Mapify", logo: "https://mapify.ai/favicon.ico", category: "MindMap", slogan: "一句話生成心智圖", desc: "一句話、文章、網站、YouTube、圖片、音訊生成各種漂亮心智圖。", url: "https://mapify.ai" },
  { name: "Taskade", logo: "https://taskade.com/favicon.ico", category: "MindMap", slogan: "任務需求轉執行清單", desc: "說您的任務需求馬上產出一目了然執行清單、思維導圖、流程圖。", url: "https://taskade.com" },
  { name: "Napkin", logo: "https://www.napkin.ai/favicon.ico", category: "MindMap", slogan: "文字轉視覺化圖表", desc: "貼上文字內容自動轉成秒懂的視覺化圖表，也可輸入提示詞生成。", url: "https://www.napkin.ai" },
  { name: "Piktochart", logo: "https://piktochart.com/favicon.ico", category: "MindMap", slogan: "多張圖表一次生成", desc: "能產出一整份多張圖表，還有多款設計模板可以套用。", url: "https://piktochart.com" },
  { name: "Felo", logo: "https://felo.ai/favicon.ico", category: "MindMap", slogan: "聊天機器人轉心智圖", desc: "聊天機器人不只幫您找答案，還可以把回答轉成心智圖。", url: "https://felo.ai" },
  { name: "EdrawMind", logo: "https://www.edrawsoft.com/favicon.ico", category: "MindMap", slogan: "多人協作心智圖", desc: "多人線上協作共編的心智圖，還可以一鍵轉成 PPT。", url: "https://www.edrawsoft.com" },
  { name: "Infography", logo: "https://infography.ai/favicon.ico", category: "MindMap", slogan: "文章轉資訊圖表", desc: "把英文文章轉成簡化的中文資訊圖表，範本多款又好看。", url: "https://infography.ai" },
  { name: "Whimsical", logo: "https://whimsical.com/favicon.ico", category: "MindMap", slogan: "多功能圖表工具", desc: "心智圖、流程圖、便利貼都能打字產出，而且可以多人協作。", url: "https://whimsical.com" },
  { name: "Gitmind", logo: "https://gitmind.com/favicon.ico", category: "MindMap", slogan: "AI 對話生成心智圖", desc: "AI 對話生成心智圖，點一鍵演示就瞬間變成投影片簡報。", url: "https://gitmind.com" },

  // VideoEdit
  { name: "Animated Drawings", logo: "https://www.animateddrawings.com/favicon.ico", category: "VideoEdit", slogan: "自己畫的角色動起來", desc: "把自己畫的角色圖片加上挑選動作就可以動起來。", url: "https://www.animateddrawings.com" },
  { name: "Viggle", logo: "https://viggle.ai/favicon.ico", category: "VideoEdit", slogan: "人物跳舞影片生成", desc: "指定的動作影片，上傳人物全身照，馬上讓那個人跳舞。", url: "https://viggle.ai" },
  { name: "Filmora", logo: "https://filmora.wondershare.com/favicon.ico", category: "VideoEdit", slogan: "長片轉短片與物件刪除", desc: "一鍵長片轉短片，還有塗抹刪除物件功能。", url: "https://filmora.wondershare.com" },
  { name: "Domo AI", logo: "https://www.domo.ai/favicon.ico", category: "VideoEdit", slogan: "影片風格轉換", desc: "用一張照片就可以改變影片的風格，把現實變成動漫。", url: "https://www.domo.ai" },
  { name: "Capcut", logo: "https://www.capcut.com/favicon.ico", category: "VideoEdit", slogan: "隱藏版帶貨 Reels 功能", desc: "隱藏版功能！貼上拍賣連結就幫您做好帶貨 Reels。", url: "https://www.capcut.com" },

  // Design
  { name: "Leonardo", logo: "https://leonardo.ai/favicon.ico", category: "Design", slogan: "手殘畫轉高質感圖像", desc: "上傳手殘畫或輸入提示詞，可選擇套用多種風格模板。", url: "https://leonardo.ai" },
  { name: "Dreamina", logo: "https://www.dreamina.com/favicon.ico", category: "Design", slogan: "圖片二創美圖", desc: "圖片 1+1 二創美圖，用圖片指定主角、風格快速生成。", url: "https://www.dreamina.com" },
  { name: "Kittl", logo: "https://www.kittl.com/favicon.ico", category: "Design", slogan: "3 秒搞定 LOGO 設計", desc: "輸入文字 3 秒搞定 LOGO！還可以做 Mockup 模擬商品照。", url: "https://www.kittl.com" },
  { name: "EasyPeasy", logo: "https://www.easypeasyai.com/favicon.ico", category: "Design", slogan: "AI 室內設計", desc: "上傳居家照片，選您喜歡的室內風格，幫您完成室內設計。", url: "https://www.easypeasyai.com" },
  { name: "Prome", logo: "https://www.prome.ai/favicon.ico", category: "Design", slogan: "電商專業商品照", desc: "電商必備！給 AI 產品照，生成指定的質感專業商品照。", url: "https://www.prome.ai" },
  { name: "Recraft", logo: "https://www.recraft.ai/favicon.ico", category: "Design", slogan: "生成商用 Icon 集合", desc: "給 AI 一張參考圖就能生成一組超 Q 的 Icon，可商用。", url: "https://www.recraft.ai" },
  { name: "Magic Studio", logo: "https://www.magicstudio.com/favicon.ico", category: "Design", slogan: "全能修圖工具", desc: "移除物件/背景、無損放大、生圖片、轉檔、大頭照通通有。", url: "https://www.magicstudio.com" },
  { name: "Restore Photos", logo: "https://www.restorephoto.ai/favicon.ico", category: "Design", slogan: "模糊舊照變高清", desc: "免註冊，各種模糊照、失焦照、低解析舊照馬上變高清。", url: "https://www.restorephoto.ai" },
  { name: "ColorMagic", logo: "https://www.colormagic.ai/favicon.ico", category: "Design", slogan: "AI 配色工具", desc: "用這個 AI 配色不會出錯，輸入關鍵字給您色票調色盤。", url: "https://www.colormagic.ai" },

  // ContentCreation
  { name: "Genape", logo: "https://genape.ai/favicon.ico", category: "ContentCreation", slogan: "小編神器生成社群貼文", desc: "小編神器！貼上文章連結生成 IG 社群貼文，連圖片都有。", url: "https://genape.ai" },

  // ProjectManagement
  { name: "Magic To Do", logo: "https://www.magictodo.ai/favicon.ico", category: "ProjectManagement", slogan: "目標轉任務清單", desc: "秒變 J 人！輸入目標就列出任務項目，更細項的規劃清單。", url: "https://www.magictodo.ai" },
  { name: "Reclaim", logo: "https://reclaim.ai/favicon.ico", category: "ProjectManagement", slogan: "智能行事曆規劃", desc: "給它任務跟截止日，幫您規劃好還安排到您有空的行事曆裡。", url: "https://reclaim.ai" },

  // Other
  { name: "Layla", logo: "https://layla.ai/favicon.ico", category: "Other", slogan: "AI 旅遊行程規劃", desc: "跟 AI 說您的旅遊需求，馬上幫您規劃旅遊行程與住宿。", url: "https://layla.ai" },
  { name: "Lawsnote", logo: "https://lawsnote.com/favicon.ico", category: "Other", slogan: "法律機器人查法規", desc: "告訴法律機器人您遇到的問題，幫您查法規和裁判。", url: "https://lawsnote.com" },
  { name: "Interview Warmup", logo: "https://interviewwarmup.com/favicon.ico", category: "Other", slogan: "英文面試練習", desc: "練習英文面試神器，AI 模擬面試官問問題陪您面試。", url: "https://interviewwarmup.com" },

  // Existing tools from previous list
  { name: "Manus", logo: "https://manus.im/favicon.ico", category: "General", slogan: "通用目的 AI 代理", desc: "能執行任何任務的通用 AI 代理，從研究到開發再到自動化。", url: "https://manus.im" },
  { name: "Gemini", logo: "https://gemini.google.com/favicon.ico", category: "General", slogan: "Google 最強 AI 助手", desc: "多模態 AI 助手，擅長圖像、視頻與文字理解。", url: "https://gemini.google.com" },
  { name: "Grok", logo: "https://grok.x.ai/favicon.ico", category: "General", slogan: "X 官方 AI 助手", desc: "實時信息訪問的 AI 助手，適合快速查詢與分析。", url: "https://grok.x.ai" },
  { name: "Skywork", logo: "https://www.skywork.ai/favicon.ico", category: "General", slogan: "新興的中文 AI 模型", desc: "專為中文優化的高性能 AI 模型，適合中文內容生成。", url: "https://www.skywork.ai" },
  { name: "MiniMax", logo: "https://www.minimaxi.com/favicon.ico", category: "Writing", slogan: "高效能中文 AI 模型", desc: "快速且準確的中文文本生成，適合內容創作與翻譯。", url: "https://www.minimaxi.com" },
  { name: "AlStudio", logo: "https://www.alstudio.ai/favicon.ico", category: "Writing", slogan: "AI 創意寫作工具", desc: "協助創意寫作、故事構思與文學創作的 AI 平台。", url: "https://www.alstudio.ai" },
  { name: "Grammarly", logo: "https://www.grammarly.com/favicon.ico", category: "Writing", slogan: "AI 文法與寫作助手", desc: "實時檢查文法、拼寫與風格，提升寫作品質。", url: "https://www.grammarly.com" },
  { name: "Copyscape", logo: "https://www.copyscape.com/favicon.ico", category: "Writing", slogan: "AI 內容檢測工具", desc: "檢測內容重複與抄襲，確保內容原創性。", url: "https://www.copyscape.com" },
  { name: "DeepL", logo: "https://www.deepl.com/favicon.ico", category: "Translation", slogan: "最高品質的 AI 翻譯", desc: "在歐洲語言翻譯上表現最佳，保留原文風格與含義。", url: "https://www.deepl.com" },
  { name: "Google Translate", logo: "https://translate.google.com/favicon.ico", category: "Translation", slogan: "全球最廣泛的翻譯工具", desc: "支援 100+ 語言，適合快速翻譯與多語言內容。", url: "https://translate.google.com" },
  { name: "Transladocs", logo: "https://transladocs.com/favicon.ico", category: "Translation", slogan: "整份簡報快速翻譯", desc: "一口氣翻譯整份簡報，支援 PDF、DOC 等檔案。", url: "https://transladocs.com" },
  { name: "沈浸式翻譯", logo: "https://immersive-translate.com/favicon.ico", category: "Translation", slogan: "無痛瀏覽國外網站", desc: "在 Chrome 裝擴充就可以無痛逛國外網站。", url: "https://immersive-translate.com" },
  { name: "Semrush", logo: "https://semrush.com/favicon.ico", category: "Marketing", slogan: "企業級 AI SEO 平台", desc: "完整的 SEO、內容行銷與競爭分析工具，內建 AI 優化建議。", url: "https://semrush.com" },
  { name: "Jasper", logo: "https://www.jasper.ai/favicon.ico", category: "Marketing", slogan: "AI 內容行銷助手", desc: "快速生成高品質行銷文案、部落格文章與社群內容。", url: "https://www.jasper.ai" },
  { name: "Surfer SEO", logo: "https://surferseo.com/favicon.ico", category: "Marketing", slogan: "AI 內容優化工具", desc: "分析排名靠前的內容，AI 自動優化您的文章以提升排名。", url: "https://surferseo.com" },
  { name: "Copysmith", logo: "https://www.copysmith.ai/favicon.ico", category: "Marketing", slogan: "AI 文案生成工具", desc: "為電商、廣告與行銷生成高轉化率的文案。", url: "https://www.copysmith.ai" },

  // Marketing AI 6.0 - 語言與內容 AI
  { name: "Rytr", logo: "https://rytr.me/favicon.ico", category: "MarketingContent", slogan: "AI 文案與內容生成", desc: "快速生成行銷文案、部落格文章與社群內容，支援多種語言與風格。", url: "https://rytr.me" },
  { name: "Hyperwrite", logo: "https://www.hyperwrite.com/favicon.ico", category: "MarketingContent", slogan: "AI 寫作與自動化工具", desc: "在任何網頁上使用 AI 自動完成文字、生成內容與提高生產力。", url: "https://www.hyperwrite.com" },

  // Marketing AI 6.0 - 分析與洞察 AI
  { name: "Tableau Pulse", logo: "https://www.tableau.com/favicon.ico", category: "MarketingAnalytics", slogan: "商業智能 AI 分析", desc: "自動生成數據洞察與可視化報告，幫助行銷人員快速做決策。", url: "https://www.tableau.com" },
  { name: "Power BI Copilot", logo: "https://powerbi.microsoft.com/favicon.ico", category: "MarketingAnalytics", slogan: "Microsoft 的 AI 數據分析", desc: "在 Power BI 中使用 AI 自動生成圖表、分析與洞察。", url: "https://powerbi.microsoft.com" },
  { name: "MonkeyLearn", logo: "https://monkeylearn.com/favicon.ico", category: "MarketingAnalytics", slogan: "文本分析與分類 AI", desc: "自動分類與分析客戶反饋、社群評論與市場數據。", url: "https://monkeylearn.com" },
  { name: "Polymer Search", logo: "https://www.polymersearch.com/favicon.ico", category: "MarketingAnalytics", slogan: "AI 驅動的數據搜尋", desc: "用自然語言查詢數據，無需複雜的 SQL 或程式碼。", url: "https://www.polymersearch.com" },
  { name: "Looker AI", logo: "https://looker.com/favicon.ico", category: "MarketingAnalytics", slogan: "Google 的商業智能平台", desc: "整合 AI 的數據可視化與分析工具，適合企業決策。", url: "https://looker.com" },

  // Marketing AI 6.0 - 搜尋與研究 AI
  { name: "Connected Papers", logo: "https://www.connectedpapers.com/favicon.ico", category: "MarketingSearch", slogan: "學術論文關聯圖", desc: "視覺化展示論文之間的關聯，幫助快速找到相關研究。", url: "https://www.connectedpapers.com" },
  { name: "Scite", logo: "https://scite.ai/favicon.ico", category: "MarketingSearch", slogan: "智能引文分析", desc: "分析論文被引用的方式，判斷研究的可信度與影響力。", url: "https://scite.ai" },
  { name: "Semantic Scholar", logo: "https://www.semanticscholar.org/favicon.ico", category: "MarketingSearch", slogan: "AI 驅動的學術搜尋", desc: "使用 AI 理解論文內容，提供更精準的搜尋結果。", url: "https://www.semanticscholar.org" },

  // Marketing AI 6.0 - 行銷圖文 AI
  { name: "Nano Banana", logo: "https://www.nanobanana.ai/favicon.ico", category: "MarketingGraphics", slogan: "快速生成行銷圖像", desc: "用文字描述快速生成高品質行銷圖片與社群貼文。", url: "https://www.nanobanana.ai" },
  { name: "Ideogram", logo: "https://ideogram.ai/favicon.ico", category: "MarketingGraphics", slogan: "文字精準的圖像生成", desc: "在生成的圖像中精準呈現文字內容，適合行銷與設計。", url: "https://ideogram.ai" },
  { name: "OpenArt", logo: "https://openart.ai/favicon.ico", category: "MarketingGraphics", slogan: "AI 藝術與設計平台", desc: "集合多個 AI 模型，支援圖像生成、編輯與風格轉換。", url: "https://openart.ai" },
  { name: "VistaCreate", logo: "https://www.vistacreate.com/favicon.ico", category: "MarketingGraphics", slogan: "社群媒體設計工具", desc: "快速製作 Instagram、TikTok 與其他社群平台的專業設計。", url: "https://www.vistacreate.com" },
  { name: "Remove.bg", logo: "https://www.remove.bg/favicon.ico", category: "MarketingGraphics", slogan: "一鍵移除背景", desc: "自動移除圖片背景，適合產品照與人物照的快速處理。", url: "https://www.remove.bg" },

  // Marketing AI 6.0 - 短影音生成 AI
  { name: "Google Veo", logo: "https://deepmind.google/favicon.ico", category: "MarketingShortVideo", slogan: "Google 推出的影片生成", desc: "高品質影片生成工具，支援複雜場景與特效。", url: "https://deepmind.google" },
  { name: "DeeVid.ai", logo: "https://deevidai.com/favicon.ico", category: "MarketingShortVideo", slogan: "快速短影片生成", desc: "用文字或圖片快速生成短影片，適合社群行銷。", url: "https://deevidai.com" },
  { name: "MiniMax Video-01", logo: "https://www.minimaxi.com/favicon.ico", category: "MarketingShortVideo", slogan: "高效能影片生成", desc: "快速生成高品質短影片，支援多種風格與效果。", url: "https://www.minimaxi.com" },

  // Marketing AI 6.0 - 影片剪輯與再製 AI
  { name: "Premiere Pro (AI)", logo: "https://www.adobe.com/favicon.ico", category: "MarketingVideoEdit", slogan: "Adobe 的 AI 影片編輯", desc: "在 Premiere Pro 中使用 AI 自動剪輯、調色與特效。", url: "https://www.adobe.com" },
  { name: "Opus Clip", logo: "https://www.opusclip.com/favicon.ico", category: "MarketingVideoEdit", slogan: "長影片轉短影片", desc: "自動將長影片分割成多個高品質短影片，適合社群行銷。", url: "https://www.opusclip.com" },
  { name: "KaiPai (開拍)", logo: "https://kaipaiai.com/favicon.ico", category: "MarketingVideoEdit", slogan: "AI 影片製作平台", desc: "從腳本到成片，AI 幫助完成整個影片製作流程。", url: "https://kaipaiai.com" },
  { name: "Edits", logo: "https://edits.ai/favicon.ico", category: "MarketingVideoEdit", slogan: "AI 影片編輯工具", desc: "自動生成字幕、調整節奏與添加效果。", url: "https://edits.ai" },
  { name: "Wisecut", logo: "https://www.wisecut.video/favicon.ico", category: "MarketingVideoEdit", slogan: "自動影片剪輯", desc: "根據語音自動剪輯影片，移除靜默段落與不必要的部分。", url: "https://www.wisecut.video" },
  { name: "Pictory", logo: "https://pictory.ai/favicon.ico", category: "MarketingVideoEdit", slogan: "文字轉影片與影片編輯", desc: "用文字或部落格文章快速生成影片，支援自動字幕。", url: "https://pictory.ai" },
  { name: "Nova AI", logo: "https://www.novaai.com/favicon.ico", category: "MarketingVideoEdit", slogan: "AI 影片助手", desc: "自動生成字幕、翻譯與特效，提升影片製作效率。", url: "https://www.novaai.com" },

  // Marketing AI 6.0 - 數字人/虛擬代言 AI
  { name: "D-ID", logo: "https://www.d-id.com/favicon.ico", category: "MarketingAvatar", slogan: "AI 虛擬人物生成", desc: "用照片或影片生成會說話的虛擬人物，適合行銷與教育。", url: "https://www.d-id.com" },
  { name: "Hour One", logo: "https://www.hourone.ai/favicon.ico", category: "MarketingAvatar", slogan: "企業級虛擬主播", desc: "快速製作專業虛擬主播影片，支援多語言與品牌定制。", url: "https://www.hourone.ai" },
  { name: "Reals", logo: "https://reals.ai/favicon.ico", category: "MarketingAvatar", slogan: "AI 虛擬代言人", desc: "生成逼真的虛擬人物進行產品推廣與品牌代言。", url: "https://reals.ai" },
  { name: "Elai.io", logo: "https://elai.io/favicon.ico", category: "MarketingAvatar", slogan: "AI 影片製作平台", desc: "用文字或簡報快速生成虛擬主播影片。", url: "https://elai.io" },
  { name: "DeepBrain", logo: "https://www.deepbrain.io/favicon.ico", category: "MarketingAvatar", slogan: "AI 虛擬人物與影片", desc: "生成逼真的虛擬人物進行解說、教學與行銷推廣。", url: "https://www.deepbrain.io" },
  { name: "Surreal", logo: "https://www.surreal.ai/favicon.ico", category: "MarketingAvatar", slogan: "AI 虛擬人物生成", desc: "快速生成高品質虛擬人物，支援多種風格與語言。", url: "https://www.surreal.ai" },
  { name: "Humata", logo: "https://www.humata.ai/favicon.ico", category: "MarketingAvatar", slogan: "AI 文件分析與虛擬助手", desc: "分析文件並生成虛擬助手進行客服與行銷。", url: "https://www.humata.ai" },

  // Marketing AI 6.0 - 代理型/工作流 AI
  { name: "Operator", logo: "https://openai.com/favicon.ico", category: "MarketingWorkflow", slogan: "OpenAI 自動化代理", desc: "自動執行網頁操作、填寫表格與處理繁瑣任務。", url: "https://openai.com/operator" },
  { name: "CrewAI", logo: "https://crewai.com/favicon.ico", category: "MarketingWorkflow", slogan: "多 Agent 協作框架", desc: "構建多個 AI Agent 進行協作，完成複雜的行銷任務。", url: "https://crewai.com" },
  { name: "LangGraph", logo: "https://langchain.com/favicon.ico", category: "MarketingWorkflow", slogan: "AI 工作流構建工具", desc: "用圖形化方式構建複雜的 AI 工作流與自動化流程。", url: "https://langchain.com" },
  { name: "AutoGen", logo: "https://microsoft.com/favicon.ico", category: "MarketingWorkflow", slogan: "Microsoft 的多 Agent 框架", desc: "構建自主 AI Agent 進行對話與協作完成任務。", url: "https://microsoft.com" },
  { name: "AutoGPT", logo: "https://autogpt.com/favicon.ico", category: "MarketingWorkflow", slogan: "自主 AI 代理", desc: "自動執行任務與目標達成，無需人工干預。", url: "https://autogpt.com" },
  { name: "11x.ai (Alice)", logo: "https://11x.ai/favicon.ico", category: "MarketingWorkflow", slogan: "AI 工作流自動化", desc: "用 AI 自動化重複性工作，提升行銷團隊效率。", url: "https://11x.ai" },

  // Marketing AI 6.0 - 廣告與投放 AI
  { name: "Meta Advantage+", logo: "https://facebook.com/favicon.ico", category: "MarketingAds", slogan: "Meta 的 AI 廣告優化", desc: "自動優化廣告投放與預算分配，提升 ROI。", url: "https://facebook.com" },
  { name: "Google Performance Max", logo: "https://google.com/favicon.ico", category: "MarketingAds", slogan: "Google 的全渠道廣告", desc: "AI 自動優化跨 Google 全渠道的廣告投放。", url: "https://google.com" },
  { name: "ViralArc", logo: "https://viralarc.com/favicon.ico", category: "MarketingAds", slogan: "社群內容病毒化工具", desc: "分析與優化社群內容，提高病毒傳播潛力。", url: "https://viralarc.com" },
  { name: "TikTok Smart Performance", logo: "https://tiktok.com/favicon.ico", category: "MarketingAds", slogan: "TikTok 的 AI 廣告優化", desc: "自動優化 TikTok 廣告投放與創意組合。", url: "https://tiktok.com" },
  { name: "AdCreative.ai", logo: "https://adcreative.ai/favicon.ico", category: "MarketingAds", slogan: "AI 廣告創意生成", desc: "自動生成高轉化率的廣告創意與文案。", url: "https://adcreative.ai" },
  { name: "Magdicx", logo: "https://magdicx.com/favicon.ico", category: "MarketingAds", slogan: "廣告數據分析平台", desc: "分析與優化廣告效果，提供詳細的 ROI 報告。", url: "https://magdicx.com" },
  { name: "Revealbot", logo: "https://revealbot.com/favicon.ico", category: "MarketingAds", slogan: "廣告自動化與優化", desc: "自動化廣告管理與優化，支援多個廣告平台。", url: "https://revealbot.com" },
  { name: "Smartly.io", logo: "https://www.smartly.io/favicon.ico", category: "MarketingAds", slogan: "企業級廣告管理平台", desc: "集中管理與優化所有廣告渠道，提升行銷效率。", url: "https://www.smartly.io" },

  { name: "Intercom", logo: "https://www.intercom.com/favicon.ico", category: "Customer", slogan: "AI 客服與對話平台", desc: "整合客服、行銷與產品工具，提供 AI 驅動的客戶支持。", url: "https://www.intercom.com" },
  { name: "Zendesk AI", logo: "https://www.zendesk.com/favicon.ico", category: "Customer", slogan: "企業級客服 AI 解決方案", desc: "自動化客服工作流，提升回應速度與客戶滿意度。", url: "https://www.zendesk.com" },
  { name: "Ada", logo: "https://www.ada.support/favicon.ico", category: "Customer", slogan: "AI 客服機器人平台", desc: "無需代碼即可構建智能客服機器人，支援多語言與多渠道。", url: "https://www.ada.support" },
  { name: "Kustomer", logo: "https://www.kustomer.com/favicon.ico", category: "Customer", slogan: "全渠道 AI 客服 CRM", desc: "統一管理所有客戶互動，AI 自動分類與回應客服工單。", url: "https://www.kustomer.com" },
  { name: "Mabl", logo: "https://www.mabl.com/favicon.ico", category: "Testing", slogan: "AI 低代碼測試自動化", desc: "從屏幕錄製自動生成測試用例，無需編寫複雜代碼。", url: "https://www.mabl.com" },
  { name: "Testim", logo: "https://www.testim.io/favicon.ico", category: "Testing", slogan: "自我修復的 AI 測試工具", desc: "AI 自動修復失敗的測試，減少維護成本與測試時間。", url: "https://www.testim.io" },
  { name: "Applitools", logo: "https://applitools.com/favicon.ico", category: "Testing", slogan: "AI 視覺測試平台", desc: "自動檢測 UI 變化與視覺缺陷，確保跨瀏覽器兼容性。", url: "https://applitools.com" },
  { name: "QA Wolf", logo: "https://www.qawolf.com/favicon.ico", category: "Testing", slogan: "自動化測試代碼生成", desc: "自動生成可維護的 E2E 測試代碼，加速 QA 流程。", url: "https://www.qawolf.com" },
  { name: "Scale AI", logo: "https://scale.com/favicon.ico", category: "Labeling", slogan: "企業級數據標註平台", desc: "大規模數據標註與質量控制，支援 RLHF 與模型評估。", url: "https://scale.com" },
  { name: "Labelbox", logo: "https://labelbox.com/favicon.ico", category: "Labeling", slogan: "機器學習數據標註工具", desc: "靈活的數據標註工作流，支援圖像、文字與視頻標註。", url: "https://labelbox.com" },
  { name: "SuperAnnotate", logo: "https://www.superannotate.com/favicon.ico", category: "Labeling", slogan: "AI 輔助數據標註", desc: "AI 自動標註與質量檢查，大幅加速標註效率。", url: "https://www.superannotate.com" },
  { name: "Spellbook", logo: "https://www.spellbook.legal/favicon.ico", category: "Legal", slogan: "AI 法律文件起草工具", desc: "在 Word 中使用 AI 起草與審查法律文件，確保準確性。", url: "https://www.spellbook.legal" },
  { name: "Lexis+ AI", logo: "https://www.lexisnexis.com/favicon.ico", category: "Legal", slogan: "法律研究與起草 AI", desc: "基於 LexisNexis 法律數據庫的 AI 研究與起草工具。", url: "https://www.lexisnexis.com" },
  { name: "LEGALFLY", logo: "https://www.legalfly.com/favicon.ico", category: "Legal", slogan: "法律文件編輯 AI 助手", desc: "在 Word 中自動編輯與優化法律文件，支援多國法律。", url: "https://www.legalfly.com" },
  { name: "Khan Academy Khanmigo", logo: "https://www.khanacademy.org/favicon.ico", category: "Education", slogan: "AI 私人家教", desc: "AI 驅動的個性化學習助手，支援多科目與多語言。", url: "https://www.khanacademy.org" },
  { name: "Duolingo Max", logo: "https://www.duolingo.com/favicon.ico", category: "Education", slogan: "語言學習 AI 助手", desc: "使用 GPT 提供個性化語言學習與實時糾正。", url: "https://www.duolingo.com" },
  { name: "Outschool AI", logo: "https://outschool.com/favicon.ico", category: "Education", slogan: "線上教育 AI 平台", desc: "連接學生與教師的平台，整合 AI 個性化學習功能。", url: "https://outschool.com" },
  { name: "Visily", logo: "https://www.visily.ai/favicon.ico", category: "Code", slogan: "手繪框架圖轉網頁", desc: "上傳手繪的框架圖 5 秒幫您設計網頁，還能套別家網站配色。", url: "https://www.visily.ai" },
  { name: "Websim", logo: "https://websim.ai/favicon.ico", category: "Code", slogan: "需求轉網站生成", desc: "任何需求：遊戲、行程規劃、音樂製作，都能生出網站。", url: "https://websim.ai" },
  { name: "Wegic", logo: "https://www.wegic.ai/favicon.ico", category: "Code", slogan: "一句話生成網頁", desc: "一句話生成手機版＋電腦版網頁，而且可以發佈上線！", url: "https://www.wegic.ai" },
];

const categories = [
  { id: "All", label: "全部" },
  { id: "Automation", label: "自動化 & Agent" },
  { id: "Video", label: "影片生成" },
  { id: "VideoEdit", label: "影片後製" },
  { id: "Slides", label: "簡報製作" },
  { id: "Audio", label: "音樂音效" },
  { id: "Productivity", label: "生產力 & 圖像" },
  { id: "Code", label: "代碼生成" },
  { id: "Research", label: "研究與分析" },
  { id: "3D", label: "3D & 設計" },
  { id: "MindMap", label: "心智圖表" },
  { id: "Design", label: "修圖設計" },
  { id: "Customer", label: "客服機器人" },
  { id: "Testing", label: "測試與 QA" },
  { id: "Labeling", label: "數據標註" },
  { id: "Legal", label: "法律文件" },
  { id: "Education", label: "教育學習" },
  { id: "Translation", label: "翻譯工具" },
  { id: "Marketing", label: "行銷 & SEO" },
  { id: "General", label: "通用 AI 助手" },
  { id: "Writing", label: "寫作工具" },
  { id: "ContentCreation", label: "內容創作" },
  { id: "ProjectManagement", label: "專案管理" },
  { id: "MarketingContent", label: "行銷文案" },
  { id: "MarketingAnalytics", label: "行銷分析" },
  { id: "MarketingSearch", label: "行銷研究" },
  { id: "MarketingGraphics", label: "行銷圖文" },
  { id: "MarketingShortVideo", label: "短影音生成" },
  { id: "MarketingVideoEdit", label: "影片剪輯" },
  { id: "MarketingAvatar", label: "虛擬代言人" },
  { id: "MarketingWorkflow", label: "行銷工作流" },
  { id: "MarketingAds", label: "廣告投放" },
  { id: "Other", label: "其他工具" }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setIsHeaderVisible(currentScrollY < lastScrollY || currentScrollY < 100);
    setLastScrollY(currentScrollY);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
      <header className={`sticky top-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80 transition-all duration-300 ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="container py-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 bg-gradient-to-b from-foreground to-muted bg-clip-text text-transparent">
              AI Tools Navigator
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              2025-2026 年最熱門、真正好用的 AI 工具精選導航 | 120+ 工具 | 24+ 分類
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
          <div className="flex flex-wrap justify-center gap-2 max-h-32 overflow-y-auto pb-2 transition-all duration-300">
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
            找到 <span className="text-primary font-semibold">{filteredTools.length}</span> 個工具 | 共 {tools.length} 個工具
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
                  <div className="relative w-12 h-12">
                    <img 
                      src={tool.logo} 
                      alt={tool.name}
                      className="w-12 h-12 rounded-lg object-contain bg-white/5 p-2 logo-image"
                      onError={(e) => {
                        e.currentTarget.classList.add('hidden');
                        const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                        if (placeholder) placeholder.classList.remove('hidden');
                      }}
                    />
                    <div className="absolute inset-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary/60 hidden" />
                  </div>
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
        <p>AI Tools Navigator © 2026 | 精心篩選最熱門的 AI 工具 | 120+ 工具 | 24+ 分類</p>
      </footer>
    </div>
  );
}
