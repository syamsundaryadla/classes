'use client'

import React, { useEffect } from 'react'
import { PresentationLayout } from '@/components/layout/PresentationLayout'
import { Slide, SlideTitle, SlideSubtitle, SlideContent } from '@/components/presentation/Slide'
import { CodeBlock } from '@/components/presentation/CodeBlock'
import { RAGSimulation } from '@/components/demos/RAGSimulation'
import { AgentSimulation } from '@/components/demos/AgentSimulation'
import { MultiAgentSimulation } from '@/components/demos/MultiAgentSimulation'
import { VectorEmbeddingVisualizer } from '@/components/demos/VectorEmbeddingVisualizer'
import { PromptBuilder } from '@/components/demos/PromptBuilder'
import { CurriculumIndex } from '@/components/presentation/CurriculumIndex'
import { TokenCalculator } from '@/components/demos/TokenCalculator'
import { AIChatBot } from '@/components/demos/AIChatBot'
import { usePresentationStore } from '@/lib/store'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { 
  CheckCircle2, 
  Terminal, 
  Cpu, 
  Workflow, 
  Code2, 
  Bug, 
  Rocket, 
  Layers, 
  ShieldCheck, 
  Bot, 
  Settings,
  ArrowRight,
  Sparkles,
  Zap,
  Network,
  Lock,
  MessageSquare,
  History,
  Palette,
  User,
  Search,
  Eye,
  FastForward,
  UserCircle,
  BrainCircuit,
  MessageCircle,
  ShieldAlert,
  Users,
  Database,
  TestTube,
  Globe,
  Binary,
  Scissors,
  FileText,
  PlugZap,
  Server,
  MonitorSmartphone,
  Share2
} from 'lucide-react'

export default function PresentationPage() {
  const { setTotalSlides, currentSlide, viewMode, currentTopicId } = usePresentationStore()
  
  useEffect(() => {
    setTotalSlides(currentTopicId === 'rag' ? 25 : 18)
  }, [currentTopicId, setTotalSlides])

  const renderRagSlide = () => {
    switch (currentSlide) {
      // PART 1 - INTRODUCTION
      case 0:
        return (
          <Slide>
            <div className="flex flex-col items-center justify-center text-center space-y-8 h-full">
              <Badge variant="outline" className="px-4 py-1 text-primary border-primary/20 bg-primary/5 uppercase tracking-[0.2em] font-bold">
                Advanced Masterclass
              </Badge>
              <SlideTitle className="text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary/50">
                RAG & AGENTIC AI
              </SlideTitle>
              <SlideSubtitle className="max-w-2xl mx-auto">
                How modern AI systems actually work internally. From Vector Databases to Multi-Agent orchestration.
              </SlideSubtitle>
              <div className="flex gap-4 pt-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted border text-sm font-medium">
                  <Sparkles className="h-4 w-4 text-primary" /> End-to-End Architecture
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted border text-sm font-medium">
                  <Zap className="h-4 w-4 text-yellow-500" /> Interactive Simulations
                </div>
              </div>
            </div>
          </Slide>
        )
      case 1:
        return (
          <Slide>
            <SlideTitle>The Evolution of AI Systems</SlideTitle>
            <SlideContent>
              <div className="flex flex-col items-center justify-center h-full space-y-12">
                <div className="flex items-center justify-between w-full max-w-5xl">
                  {[
                    { title: "Chatbots", desc: "Stateless, text in, text out.", icon: MessageSquare, year: "2022" },
                    { title: "RAG Systems", desc: "External knowledge injection.", icon: Database, year: "2023" },
                    { title: "Agents", desc: "Tool calling & reasoning.", icon: BrainCircuit, year: "2024" },
                    { title: "Autonomous", desc: "Multi-agent collaboration.", icon: Users, year: "2025+" }
                  ].map((phase, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="flex flex-col items-center text-center max-w-[200px]"
                    >
                      <div className="text-primary font-bold text-sm mb-4 bg-primary/10 px-3 py-1 rounded-full">{phase.year}</div>
                      <div className="h-20 w-20 rounded-full bg-card border shadow-xl flex items-center justify-center mb-4 relative z-10">
                        <phase.icon className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-bold text-lg">{phase.title}</h3>
                      <p className="text-xs text-muted-foreground mt-2">{phase.desc}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="w-full max-w-4xl h-2 bg-muted rounded-full relative -mt-[140px] -z-10">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-primary/20 via-primary to-purple-500 rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                  />
                </div>
              </div>
            </SlideContent>
          </Slide>
        )
      
      // PART 2 - RAG DEEP DIVE
      case 2:
        return (
          <Slide>
            <SlideTitle>Introduction to RAG</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-primary">Retrieval-Augmented Generation</h3>
                  <p className="text-xl text-muted-foreground">
                    Base LLMs have a knowledge cutoff and are prone to hallucinations. RAG solves this by providing the model with exact, retrieved facts right before generating an answer.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500 h-6 w-6" /> <span>Eliminates Hallucinations</span></li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500 h-6 w-6" /> <span>Accesses Private Data</span></li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500 h-6 w-6" /> <span>Cheaper than Fine-Tuning</span></li>
                  </ul>
                </div>
                <div className="relative p-8 rounded-3xl bg-muted/30 border border-primary/20">
                  <div className="flex flex-col gap-4">
                    <div className="p-4 rounded-xl bg-card border shadow text-center">
                      <span className="font-bold text-sm text-muted-foreground">Traditional LLM</span>
                      <p className="text-xs mt-2">"Who won the 2026 World Cup?" → <span className="text-red-500">I don't know / Hallucination</span></p>
                    </div>
                    <ArrowRight className="mx-auto h-6 w-6 text-primary rotate-90" />
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary shadow text-center">
                      <span className="font-bold text-sm text-primary">RAG System</span>
                      <p className="text-xs mt-2">Retrieves DB article → Passes to LLM → <span className="text-green-500">Accurate Answer</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </SlideContent>
          </Slide>
        )
      case 3:
        return (
          <Slide>
            <SlideTitle>Interactive RAG Flow</SlideTitle>
            <SlideContent>
              <RAGSimulation />
            </SlideContent>
          </Slide>
        )
      case 4:
        return (
          <Slide>
            <SlideTitle>RAG Data Pipelines (ETL)</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-xl text-muted-foreground">
                    The hardest part of RAG isn't the Vector DB—it's the ETL (Extract, Transform, Load) pipeline. Unstructured data (PDFs with tables, charts, complex layouts) must be parsed correctly before chunking.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3"><FileText className="text-primary h-6 w-6" /> <strong>OCR & Vision Models:</strong> Used to extract text from scanned documents and images.</li>
                    <li className="flex items-center gap-3"><Layers className="text-primary h-6 w-6" /> <strong>Layout Parsing:</strong> Preserving the structural relationship between a table header and its rows.</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <CodeBlock 
                    language="typescript"
                    code={`
// Example using LlamaParse for complex PDFs
import { LlamaParseReader } from "llamaindex";

const reader = new LlamaParseReader({
  resultType: "markdown", // Preserves tables!
  apiKey: "LLAMA_CLOUD_API_KEY"
});

const documents = await reader.loadData("financial_report.pdf");
// Output: Markdown representation with tables preserved
                    `}
                  />
                </div>
              </div>
            </SlideContent>
          </Slide>
        )
      case 5:
        return (
          <Slide>
            <SlideTitle>Document Chunking</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <p className="text-xl text-muted-foreground">
                    You can't pass a 1000-page PDF to an LLM. Documents must be split into smaller "chunks" before embedding.
                  </p>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-card border"><span className="font-bold">Fixed Size:</span> 500 tokens per chunk. Fast but breaks context.</div>
                    <div className="p-4 rounded-xl bg-card border"><span className="font-bold">Sliding Window:</span> 500 tokens with 50 token overlap. Preserves boundaries.</div>
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary"><span className="font-bold text-primary">Semantic Chunking:</span> Splits by paragraph, markdown headers, or logical structure.</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <CodeBlock 
                    language="typescript"
                    code={`
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const text = "Long document content...";

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const output = await splitter.createDocuments([text]);
// Result: Array of Document objects
                    `}
                  />
                </div>
              </div>
            </SlideContent>
          </Slide>
        )
      case 6:
        return (
          <Slide>
            <SlideTitle>Embeddings Explained</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                <div className="space-y-6">
                  <p className="text-xl text-muted-foreground">
                    Embeddings convert text into high-dimensional numerical vectors (e.g., 1536 dimensions). 
                    Semantic similarity becomes mathematical distance.
                  </p>
                  <CodeBlock 
                    language="python"
                    code={`
import openai

response = openai.embeddings.create(
    input="The quick brown fox",
    model="text-embedding-3-small"
)

vector = response.data[0].embedding
# Output: [0.0023, -0.0145, 0.0551, ...] (1536 floats)
                    `}
                  />
                </div>
                <VectorEmbeddingVisualizer />
              </div>
            </SlideContent>
          </Slide>
        )
      case 7:
        return (
          <Slide>
            <SlideTitle>Vector Databases</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-xl text-muted-foreground">
                    Traditional SQL databases are built for exact matches. Vector databases are built for Approximate Nearest Neighbor (ANN) search using metrics like Cosine Similarity.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {['Pinecone', 'ChromaDB', 'Weaviate', 'Qdrant'].map(db => (
                      <div key={db} className="p-4 rounded-xl border bg-card flex items-center justify-center font-bold text-lg">
                        {db}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <CodeBlock 
                    language="typescript"
                    code={`
import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({ apiKey: 'YOUR_API_KEY' });
const index = pc.index('rag-demo');

// Search the vector DB
const queryResponse = await index.query({
  vector: [0.1, 0.2, 0.3, ...], // Query embedding
  topK: 3,
  includeMetadata: true
});
                    `}
                  />
                </div>
              </div>
            </SlideContent>
          </Slide>
        )
      case 8:
        return (
          <Slide>
            <SlideTitle>Retrieval Techniques</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <Card className="bg-card">
                   <CardContent className="p-6 space-y-4">
                     <Search className="h-8 w-8 text-blue-500" />
                     <h3 className="font-bold text-lg">Semantic Search</h3>
                     <p className="text-sm text-muted-foreground">Matches concept meaning using embeddings. Fails on exact keywords (e.g. SKUs).</p>
                   </CardContent>
                 </Card>
                 <Card className="bg-card">
                   <CardContent className="p-6 space-y-4">
                     <FileText className="h-8 w-8 text-orange-500" />
                     <h3 className="font-bold text-lg">Keyword (BM25)</h3>
                     <p className="text-sm text-muted-foreground">Traditional search. Great for exact matches, fails on synonyms.</p>
                   </CardContent>
                 </Card>
                 <Card className="bg-primary/10 border-primary">
                   <CardContent className="p-6 space-y-4">
                     <Layers className="h-8 w-8 text-primary" />
                     <h3 className="font-bold text-lg">Hybrid Search</h3>
                     <p className="text-sm text-muted-foreground">Combines both Semantic + BM25, then normalizes scores using Alpha blending.</p>
                   </CardContent>
                 </Card>
              </div>
            </SlideContent>
          </Slide>
        )
      case 9:
        return (
          <Slide>
            <SlideTitle>Context Augmentation</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                <div className="space-y-6">
                  <p className="text-xl text-muted-foreground">
                    Once relevant chunks are retrieved from the Vector DB, they are injected into the prompt alongside the user's original query.
                  </p>
                  <div className="p-4 bg-muted border rounded-xl space-y-2">
                    <h4 className="font-bold text-sm uppercase text-muted-foreground">The "Stuffed" Prompt Format</h4>
                    <p className="text-xs italic">System: Answer using only this context.<br/>Context: [Injected Chunks Here]<br/>User: [Query Here]</p>
                  </div>
                </div>
                <PromptBuilder />
              </div>
            </SlideContent>
          </Slide>
        )
      case 10:
        return (
          <Slide>
            <SlideTitle>Advanced RAG Patterns</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-card border space-y-2 hover:border-primary transition-colors">
                    <h3 className="font-bold text-lg text-primary">Query Expansion</h3>
                    <p className="text-sm text-muted-foreground">Use an LLM to generate 3 alternative versions of the user's query before searching the Vector DB, increasing recall.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-card border space-y-2 hover:border-primary transition-colors">
                    <h3 className="font-bold text-lg text-primary">Parent-Child Retrieval</h3>
                    <p className="text-sm text-muted-foreground">Embed small sentences for accurate retrieval, but return the entire parent paragraph for context generation.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-card border space-y-2 hover:border-primary transition-colors">
                    <h3 className="font-bold text-lg text-primary">Re-ranking</h3>
                    <p className="text-sm text-muted-foreground">Retrieve top 50 docs via fast Vector Search, then use a Cross-Encoder model (Cohere) to precisely re-rank the top 5.</p>
                  </div>
                </div>
                <div className="bg-muted/30 border rounded-3xl p-8 flex items-center justify-center">
                   <div className="flex flex-col items-center gap-4 text-center">
                     <Database className="h-12 w-12 text-primary" />
                     <h3 className="text-xl font-bold">Production RAG</h3>
                     <p className="text-sm text-muted-foreground max-w-sm">Enterprise systems use combinations of caching (Redis), Guardrails, and Re-rankers to ensure sub-second latency and zero hallucinations.</p>
                   </div>
                </div>
              </div>
            </SlideContent>
          </Slide>
        )
      case 11:
        return (
          <Slide>
            <SlideTitle>Graph RAG (Knowledge Graphs)</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-xl text-muted-foreground">
                    Vector databases struggle with "Multi-hop" reasoning (e.g., "Which subsidiary of Company A was acquired by the CEO of Company B?"). Knowledge Graphs solve this by mapping entity relationships.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3"><Network className="text-primary h-6 w-6" /> <strong>Entities & Edges:</strong> Nodes represent concepts (People, Companies), edges represent relationships (CEO_OF).</li>
                    <li className="flex items-center gap-3"><Database className="text-primary h-6 w-6" /> <strong>Neo4j & Cypher:</strong> Graph databases map exact relational paths, combining graph traversal with vector similarity.</li>
                  </ul>
                </div>
                <div className="p-8 bg-muted border rounded-3xl flex items-center justify-center h-64 relative overflow-hidden">
                   <div className="absolute top-1/4 left-1/4 h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center font-bold text-xs text-white z-10">Apple</div>
                   <div className="absolute bottom-1/4 right-1/4 h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center font-bold text-xs text-white z-10">Tim Cook</div>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-24 border-b-2 border-primary rotate-45 z-0" />
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border px-2 text-[10px] z-20 rounded rotate-45">CEO_OF</div>
                </div>
              </div>
            </SlideContent>
          </Slide>
        )
      case 12:
        return (
          <Slide>
            <SlideTitle>RAG Evaluation (RAGAS)</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <p className="text-xl text-muted-foreground">
                    You cannot improve what you cannot measure. RAGAS is the industry standard framework for evaluating RAG pipelines without requiring ground-truth human datasets.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 border rounded-xl bg-card">
                     <h4 className="font-bold text-primary mb-2">Context Precision</h4>
                     <p className="text-xs text-muted-foreground">Are the most relevant chunks ranked at the top of the context window?</p>
                   </div>
                   <div className="p-4 border rounded-xl bg-card">
                     <h4 className="font-bold text-primary mb-2">Context Recall</h4>
                     <p className="text-xs text-muted-foreground">Did the retriever pull ALL the necessary information to answer the question?</p>
                   </div>
                   <div className="p-4 border rounded-xl bg-card">
                     <h4 className="font-bold text-orange-500 mb-2">Faithfulness</h4>
                     <p className="text-xs text-muted-foreground">Is the generated answer strictly derived from the retrieved context? (Hallucination check)</p>
                   </div>
                   <div className="p-4 border rounded-xl bg-card">
                     <h4 className="font-bold text-orange-500 mb-2">Answer Relevance</h4>
                     <p className="text-xs text-muted-foreground">Does the generated answer directly address the user's initial query?</p>
                   </div>
                </div>
              </div>
            </SlideContent>
          </Slide>
        )
      
      // PART 3 - AGENTIC AI
      case 13:
        return (
          <Slide>
            <SlideTitle>Intro to Agentic AI</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-primary">LLMs vs Agents</h3>
                  <p className="text-xl text-muted-foreground">
                    An LLM generates text. An Agent is an LLM equipped with tools, memory, and reasoning capabilities, allowing it to take autonomous actions in the real world.
                  </p>
                </div>
                <div className="relative p-8 rounded-3xl bg-muted/30 border border-primary/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-card border rounded-xl text-center">
                      <MessageSquare className="mx-auto mb-2 text-muted-foreground" />
                      <div className="font-bold">LLM</div>
                      <div className="text-xs text-muted-foreground mt-1">"How do I book a flight?"</div>
                    </div>
                    <div className="p-4 bg-primary/10 border border-primary shadow-[0_0_15px_rgba(var(--primary),0.2)] rounded-xl text-center">
                      <Bot className="mx-auto mb-2 text-primary" />
                      <div className="font-bold text-primary">Agent</div>
                      <div className="text-xs text-muted-foreground mt-1">"I have booked your flight."</div>
                    </div>
                  </div>
                </div>
              </div>
            </SlideContent>
          </Slide>
        )
      case 14:
        return (
          <Slide>
            <SlideTitle>Agent Reasoning Simulation</SlideTitle>
            <SlideContent>
              <AgentSimulation />
            </SlideContent>
          </Slide>
        )
      case 15:
        return (
          <Slide>
            <SlideTitle>The ReAct Framework</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-xl text-muted-foreground">
                    ReAct (Reason + Act) is the standard loop for agent execution. It forces the LLM to think before acting, dramatically improving task success rates.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 font-mono font-bold text-primary">1. THOUGHT</div>
                      <p className="text-sm">Agent analyzes the prompt and decides what needs to be done next.</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="mt-1 font-mono font-bold text-orange-500">2. ACTION</div>
                      <p className="text-sm">Agent selects a tool and provides the arguments (e.g., search("weather nyc")).</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="mt-1 font-mono font-bold text-green-500">3. OBSERVE</div>
                      <p className="text-sm">The tool executes and returns the result to the Agent's context.</p>
                    </div>
                  </div>
                </div>
                <div className="p-8 bg-card border rounded-3xl flex justify-center">
                   <div className="relative w-48 h-48 animate-spin-slow">
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-primary text-background text-xs font-bold rounded">THOUGHT</div>
                     <div className="absolute bottom-4 right-0 translate-x-1/2 p-2 bg-orange-500 text-white text-xs font-bold rounded">ACTION</div>
                     <div className="absolute bottom-4 left-0 -translate-x-1/2 p-2 bg-green-500 text-white text-xs font-bold rounded">OBSERVE</div>
                     <div className="absolute inset-4 rounded-full border-4 border-dashed border-muted-foreground/30" />
                   </div>
                </div>
              </div>
            </SlideContent>
          </Slide>
        )
      case 16:
        return (
          <Slide>
            <SlideTitle>Tool Calling (Function Calling)</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                <div className="space-y-6">
                  <p className="text-xl text-muted-foreground">
                    Modern LLMs are trained to output JSON matching a specific schema when they realize they need external information.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-3 border rounded-xl text-center"><Search className="h-5 w-5 mx-auto mb-1 text-blue-500"/> Web Search</div>
                     <div className="p-3 border rounded-xl text-center"><Database className="h-5 w-5 mx-auto mb-1 text-green-500"/> SQL Query</div>
                     <div className="p-3 border rounded-xl text-center"><Terminal className="h-5 w-5 mx-auto mb-1 text-orange-500"/> Run Code</div>
                     <div className="p-3 border rounded-xl text-center"><MessageSquare className="h-5 w-5 mx-auto mb-1 text-purple-500"/> Send Email</div>
                  </div>
                </div>
                <CodeBlock 
                  language="typescript"
                  code={`
// OpenAI Tool Definition
const tools = [{
  type: "function",
  function: {
    name: "get_weather",
    description: "Get current temperature",
    parameters: {
      type: "object",
      properties: {
        location: { type: "string" },
        unit: { enum: ["celsius", "fahrenheit"] }
      },
      required: ["location"]
    }
  }
}];
                  `}
                />
              </div>
            </SlideContent>
          </Slide>
        )
      case 17:
        return (
          <Slide>
            <SlideTitle>Memory Systems</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <Card className="bg-card">
                   <CardContent className="p-6 space-y-4">
                     <History className="h-8 w-8 text-blue-500" />
                     <h3 className="font-bold text-lg">Short-Term Memory</h3>
                     <p className="text-sm text-muted-foreground">The current chat window context. Usually passed as an array of messages. Limited by the LLM's context window (e.g. 128k tokens).</p>
                   </CardContent>
                 </Card>
                 <Card className="bg-card">
                   <CardContent className="p-6 space-y-4">
                     <Database className="h-8 w-8 text-purple-500" />
                     <h3 className="font-bold text-lg">Long-Term (Vector) Memory</h3>
                     <p className="text-sm text-muted-foreground">Saving facts about the user into a Vector DB and using RAG to retrieve them in future conversations.</p>
                   </CardContent>
                 </Card>
                 <Card className="bg-card">
                   <CardContent className="p-6 space-y-4">
                     <BrainCircuit className="h-8 w-8 text-orange-500" />
                     <h3 className="font-bold text-lg">Episodic Memory</h3>
                     <p className="text-sm text-muted-foreground">Agents writing a summary of a completed task to a log file, learning from past mistakes to improve future tool selection.</p>
                   </CardContent>
                 </Card>
              </div>
            </SlideContent>
          </Slide>
        )
      case 18:
        return (
          <Slide>
            <SlideTitle>Multi-Agent Collaboration</SlideTitle>
            <SlideContent>
              <MultiAgentSimulation />
            </SlideContent>
          </Slide>
        )
      case 19:
        return (
          <Slide>
            <SlideTitle>Model Context Protocol (MCP)</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-xl text-muted-foreground">
                    MCP is a revolutionary open standard by Anthropic. It allows AI Assistants to securely connect to external data sources without hardcoded, bespoke integrations for every service.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> Standardized Client-Server architecture</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> Two-way communication over JSON-RPC</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> Exposes: Tools, Resources, and Prompts</li>
                  </ul>
                </div>
                <div className="p-8 rounded-3xl bg-muted/30 border">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex items-center justify-between w-full">
                      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl font-bold">Claude Desktop</div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <div className="p-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-[0_0_15px_rgba(var(--primary),0.5)]">MCP</div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <div className="flex flex-col gap-2">
                        <div className="p-2 bg-card border rounded text-xs font-mono">github-mcp-server</div>
                        <div className="p-2 bg-card border rounded text-xs font-mono">postgres-mcp-server</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SlideContent>
          </Slide>
        )
      case 20:
        return (
          <Slide>
            <SlideTitle>MCP Architecture Deep Dive</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                 <div className="p-6 border rounded-2xl bg-card space-y-4">
                   <MonitorSmartphone className="h-8 w-8 text-blue-500" />
                   <h3 className="font-bold">1. MCP Host</h3>
                   <p className="text-xs text-muted-foreground">The UI application (Cursor, Claude Desktop, Zed) where the LLM resides. It controls the Agent Loop and requests permissions.</p>
                 </div>
                 <div className="p-6 border rounded-2xl bg-card space-y-4">
                   <Share2 className="h-8 w-8 text-orange-500" />
                   <h3 className="font-bold">2. MCP Client</h3>
                   <p className="text-xs text-muted-foreground">Maintains 1:1 connections with servers, negotiating capabilities, and routing tool calls from the LLM to the correct server.</p>
                 </div>
                 <div className="p-6 border rounded-2xl bg-card space-y-4">
                   <PlugZap className="h-8 w-8 text-primary" />
                   <h3 className="font-bold">3. Transports</h3>
                   <p className="text-xs text-muted-foreground">How they talk. <strong>stdio</strong> for local processes (fast, secure), and <strong>SSE</strong> (Server-Sent Events) for remote network connections.</p>
                 </div>
                 <div className="p-6 border rounded-2xl bg-card space-y-4">
                   <Server className="h-8 w-8 text-green-500" />
                   <h3 className="font-bold">4. MCP Server</h3>
                   <p className="text-xs text-muted-foreground">A lightweight process exposing internal APIs (Jira, DBs) to the Client via standard JSON-RPC structures.</p>
                 </div>
              </div>
            </SlideContent>
          </Slide>
        )
      case 21:
        return (
          <Slide>
            <SlideTitle>Building an MCP Server</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                <div className="space-y-6">
                  <p className="text-xl text-muted-foreground">
                    Exposing internal enterprise systems to AI agents is incredibly simple using the official MCP SDKs.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-3"><Terminal className="text-primary h-5 w-5" /> Expose arbitrary CLI commands.</li>
                    <li className="flex gap-3"><Database className="text-primary h-5 w-5" /> Expose internal legacy databases.</li>
                  </ul>
                </div>
                <CodeBlock 
                  language="typescript"
                  code={`
import { Server } from "@modelcontextprotocol/sdk/server";

const server = new Server({ name: "my-db", version: "1.0" }, {
  capabilities: { tools: {} }
});

// Expose a tool to the LLM
server.setRequestHandler(CallToolRequestSchema, async (req) => {
  if (req.params.name === "get_internal_user") {
    const data = await legacyDB.fetchUser(req.params.arguments.id);
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
});
                  `}
                />
              </div>
            </SlideContent>
          </Slide>
        )
      
      // PART 4 - SECURITY & GUARDRAILS
      case 22:
        return (
          <Slide>
            <SlideTitle>Enterprise AI Security</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-xl text-muted-foreground">
                    Connecting autonomous agents to production databases is dangerous. Guardrails are mandatory.
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { icon: <ShieldAlert />, label: "Prompt Injection", desc: "User tricks agent into running malicious tools." },
                      { icon: <Lock />, label: "Data Leakage", desc: "RAG retrieves documents the user shouldn't see." },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-xl border bg-card/50">
                        <div className="p-2 rounded-lg bg-red-500/10 text-red-500">{item.icon}</div>
                        <div>
                          <div className="font-bold text-red-500">{item.label}</div>
                          <div className="text-xs text-muted-foreground">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-2">Implementing Guardrails</h3>
                  <CodeBlock 
                    language="typescript"
                    code={`
// Human-in-the-loop Tool Execution
const dropTableTool = {
  name: "drop_table",
  execute: async (args) => {
    // Suspend agent execution
    const approved = await requestUserApproval(
      \`Agent wants to drop table \${args.name}. Allow?\`
    );
    
    if (!approved) return "User denied action.";
    return await db.dropTable(args.name);
  }
}
                    `}
                  />
                </div>
              </div>
            </SlideContent>
          </Slide>
        )
      case 23:
        return (
          <Slide>
            <SlideTitle>Testing AI Systems</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-xl text-muted-foreground">
                    Deterministic tests (jest, mocha) fail on non-deterministic AI output. We need Evaluation frameworks (Evals).
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-3"><TestTube className="text-primary" /> <strong>LLM-as-a-Judge:</strong> Using GPT-4 to grade a smaller model's RAG output.</li>
                    <li className="flex gap-3"><TestTube className="text-primary" /> <strong>Groundedness:</strong> Checking if the answer directly references the retrieved chunks.</li>
                  </ul>
                </div>
                <CodeBlock 
                  language="typescript"
                  code={`
// Simple Eval Hook
const score = await gradeOutput({
  input: "Summarize the Q3 report",
  output: generatedSummary,
  criteria: "Does it mention the revenue drop? (1-5)"
});

if (score < 4) {
  throw new Error("AI output failed quality check");
}
                  `}
                />
              </div>
            </SlideContent>
          </Slide>
        )
      
      // PART 5 - FUTURE
      case 24:
        return (
          <Slide>
            <SlideTitle>The Future of AI Engineering</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-full">
                <div className="space-y-8 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold">The Next Frontier:</h3>
                  <ul className="space-y-4">
                    {[
                      "From wrappers to end-to-end Autonomous Organizations.",
                      "Local, privacy-first agents (Ollama, Apple Intel).",
                      "Multi-modal reasoning natively embedded in edge devices.",
                      "Every developer is now an AI Orchestrator."
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-lg">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col justify-center items-center text-center p-12 rounded-[3rem] bg-gradient-to-br from-primary to-purple-600 text-white space-y-6 shadow-2xl">
                  <Globe className="h-24 w-24 animate-pulse opacity-80" />
                  <h3 className="text-4xl font-bold">Build the Future.</h3>
                  <p className="text-white/80 text-xl max-w-sm">
                    Master RAG and Agents today to build the software of tomorrow.
                  </p>
                </div>
              </div>
            </SlideContent>
          </Slide>
        )
      default:
        return null
    }
  }

  const renderGeminiSlide = () => {
    switch (currentSlide) {
      // PART 1 - UNDERSTANDING LLM APIs
      case 0:
        return (
          <Slide>
            <div className="flex flex-col items-center justify-center text-center space-y-8 h-full">
              <Badge variant="outline" className="px-4 py-1 text-primary border-primary/20 bg-primary/5 uppercase tracking-[0.2em] font-bold">
                Module 2 Masterclass
              </Badge>
              <SlideTitle className="text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-yellow-500 to-primary/50">
                LLM APIs & GEMINI
              </SlideTitle>
              <SlideSubtitle className="max-w-2xl mx-auto">
                Understanding Large Language Models, Tokens, Context Windows, and Building Real-World AI Applications with Gemini & FastAPI.
              </SlideSubtitle>
              <div className="flex gap-4 pt-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted border text-sm font-medium">
                  <Cpu className="h-4 w-4 text-yellow-500" /> Token & Cost Estimation
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted border text-sm font-medium">
                  <Bot className="h-4 w-4 text-primary" /> Live Streaming Demos
                </div>
              </div>
            </div>
          </Slide>
        )
      case 1:
        return (
          <Slide>
            <SlideTitle>What are Large Language Models (LLMs)?</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-primary">Next-Token Prediction Engines</h3>
                  <p className="text-xl text-muted-foreground">
                    At their core, LLMs are massive neural networks trained on vast amounts of text data to predict the most likely next word (or token) given a sequence of preceding words.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500 h-6 w-6 shrink-0" /> <span>Transformer Architecture (Attention Mechanism)</span></li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500 h-6 w-6 shrink-0" /> <span>Billions of Parameters (Weights & Biases)</span></li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500 h-6 w-6 shrink-0" /> <span>Emergent Reasoning & Few-Shot Learning</span></li>
                  </ul>
                </div>
                <div className="p-8 bg-muted border rounded-3xl space-y-6 text-center">
                  <BrainCircuit className="h-16 w-16 text-primary mx-auto animate-pulse" />
                  <div className="text-lg font-bold">"The cat sat on the..."</div>
                  <div className="flex justify-center gap-4">
                    <div className="p-3 bg-primary text-primary-foreground font-bold rounded-xl shadow">mat (85%)</div>
                    <div className="p-3 bg-card border rounded-xl">couch (10%)</div>
                    <div className="p-3 bg-card border rounded-xl">floor (5%)</div>
                  </div>
                </div>
              </div>
            </SlideContent>
          </Slide>
        )
      case 2:
        return (
          <Slide>
            <SlideTitle>Tokens and Context Windows</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-primary">The Currency of LLMs</h3>
                  <p className="text-xl text-muted-foreground">
                    LLMs do not read words; they read chunks of characters called <strong>Tokens</strong>. Roughly, 1 token ≈ 4 characters or 0.75 words.
                  </p>
                  <div className="p-4 bg-card border rounded-2xl space-y-2">
                    <h4 className="font-bold text-yellow-500">Context Window</h4>
                    <p className="text-sm text-muted-foreground">The maximum number of tokens an LLM can process in a single prompt (input + output). Gemini 1.5 Pro boasts a massive <strong>2 Million Token</strong> context window!</p>
                  </div>
                </div>
                <TokenCalculator />
              </div>
            </SlideContent>
          </Slide>
        )
      case 3:
        return (
          <Slide>
            <SlideTitle>Prompt → Model → Response Workflow</SlideTitle>
            <SlideContent>
              <div className="flex flex-col items-center justify-center h-full space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl items-center">
                  <div className="p-8 bg-card border rounded-3xl space-y-4 text-center relative group">
                    <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto text-blue-500 font-bold">1</div>
                    <h3 className="font-bold text-xl">Prompt Formulation</h3>
                    <p className="text-xs text-muted-foreground">User designs the prompt with system instructions, context, and query.</p>
                    <ArrowRight className="absolute -right-6 top-1/2 -translate-y-1/2 h-8 w-8 text-primary hidden md:block" />
                  </div>
                  <div className="p-8 bg-primary/10 border border-primary rounded-3xl space-y-4 text-center relative group shadow-lg shadow-primary/10">
                    <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto font-bold">2</div>
                    <h3 className="font-bold text-xl">Model Execution</h3>
                    <p className="text-xs text-muted-foreground">LLM tokenizes input, processes attention layers, and streams tokens.</p>
                    <ArrowRight className="absolute -right-6 top-1/2 -translate-y-1/2 h-8 w-8 text-primary hidden md:block" />
                  </div>
                  <div className="p-8 bg-card border rounded-3xl space-y-4 text-center relative group">
                    <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto text-green-500 font-bold">3</div>
                    <h3 className="font-bold text-xl">Response Delivery</h3>
                    <p className="text-xs text-muted-foreground">Client receives decoded text, parses JSON/markdown, and updates UI.</p>
                  </div>
                </div>
              </div>
            </SlideContent>
          </Slide>
        )
      case 4:
        return (
          <Slide>
            <SlideTitle>How AI Applications Use APIs</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-primary">Decoupling AI Logic</h3>
                  <p className="text-xl text-muted-foreground">
                    Instead of hosting 70-billion parameter models locally (which requires expensive clusters of A100 GPUs), modern applications make REST or gRPC API calls to cloud providers.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-primary h-6 w-6 shrink-0" /> <span>Pay-per-token pricing model</span></li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-primary h-6 w-6 shrink-0" /> <span>Server-Sent Events (SSE) for streaming</span></li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-primary h-6 w-6 shrink-0" /> <span>Stateless API interactions</span></li>
                  </ul>
                </div>
                <CodeBlock 
                  language="typescript"
                  code={`
// Simple REST API call to an LLM provider
const response = await fetch("https://api.provider.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": \`Bearer \${process.env.API_KEY}\`
  },
  body: JSON.stringify({
    model: "gemini-1.5-flash",
    messages: [{ role: "user", content: "Explain quantum computing" }],
    stream: true
  })
});
                  `}
                />
              </div>
            </SlideContent>
          </Slide>
        )
      case 5:
        return (
          <Slide>
            <SlideTitle>Common LLM Use Cases</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-card border-border">
                  <CardContent className="p-6 space-y-4">
                    <MessageSquare className="h-8 w-8 text-blue-500" />
                    <h3 className="font-bold text-lg">Customer Support Bots</h3>
                    <p className="text-sm text-muted-foreground">Automating 80% of Tier-1 support queries with 24/7 instant, multilingual responses.</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 space-y-4">
                    <FileText className="h-8 w-8 text-orange-500" />
                    <h3 className="font-bold text-lg">Content & Summarization</h3>
                    <p className="text-sm text-muted-foreground">Condensing 50-page financial reports into 3 bullet points in seconds.</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 space-y-4">
                    <Code2 className="h-8 w-8 text-green-500" />
                    <h3 className="font-bold text-lg">Code Generation & Copilots</h3>
                    <p className="text-sm text-muted-foreground">Assisting developers with writing boilerplates, refactoring, and debugging.</p>
                  </CardContent>
                </Card>
              </div>
            </SlideContent>
          </Slide>
        )

      // PART 2 - GEMINI API BASICS
      case 6:
        return (
          <Slide>
            <SlideTitle>Gemini Ecosystem Overview</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
                {[
                  { name: "Gemini Ultra", desc: "Largest model for highly complex tasks, reasoning, and math.", badge: "Enterprise", color: "border-blue-500" },
                  { name: "Gemini Pro", desc: "Best balance of performance and intelligence for general reasoning.", badge: "2M Context", color: "border-purple-500" },
                  { name: "Gemini Flash", desc: "Lightweight, ultra-fast, and cost-effective for high-volume tasks.", badge: "Speed", color: "border-yellow-500" },
                  { name: "Gemini Nano", desc: "Optimized for on-device execution (Pixel phones, Chrome browser).", badge: "Edge", color: "border-green-500" },
                ].map((m, i) => (
                  <Card key={i} className={`bg-card border-t-4 ${m.color} flex flex-col justify-between`}>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-lg">{m.name}</h3>
                        <Badge variant="secondary" className="text-[10px] font-bold uppercase">{m.badge}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{m.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </SlideContent>
          </Slide>
        )
      case 7:
        return (
          <Slide>
            <SlideTitle>Gemini API Setup & Authentication</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-primary">Google AI Studio</h3>
                  <p className="text-xl text-muted-foreground">
                    Getting started with Gemini is seamless. Developers can generate API keys directly inside Google AI Studio, explore prompt galleries, and test multimodal inputs.
                  </p>
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-yellow-500 font-bold text-sm">
                      <ShieldAlert className="h-4 w-4" /> Secure API Key Storage
                    </div>
                    <p className="text-xs text-muted-foreground">Never hardcode your GEMINI_API_KEY inside client-side code (React/Next.js client components). Always use backend API routes or environment variables.</p>
                  </div>
                </div>
                <CodeBlock 
                  language="bash"
                  code={`
# 1. Generate API Key in Google AI Studio
# 2. Store securely in your .env file

GEMINI_API_KEY="AIzaSyD...your_api_key_here"
                  `}
                />
              </div>
            </SlideContent>
          </Slide>
        )
      case 8:
        return (
          <Slide>
            <SlideTitle>Gemini SDK Installation & Setup</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-xl text-muted-foreground">
                    Google provides official SDKs for JavaScript/TypeScript, Python, Go, and Android. The @google/genai SDK provides an elegant, modern interface for all Gemini capabilities.
                  </p>
                  <CodeBlock 
                    language="bash"
                    code={`
# Install the official Google Gen AI SDK
npm install @google/genai
                    `}
                  />
                </div>
                <CodeBlock 
                  language="typescript"
                  code={`
import { GoogleGenAI } from '@google/genai';

// Initialize the SDK with your API key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Ready to make API calls!
                  `}
                />
              </div>
            </SlideContent>
          </Slide>
        )
      case 9:
        return (
          <Slide>
            <SlideTitle>Basic Text Generation & Parameters</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-card border"><span className="font-bold text-primary">Temperature (0.0 - 2.0):</span> Controls randomness. 0.0 is deterministic/factual; 1.0+ is creative.</div>
                    <div className="p-4 rounded-xl bg-card border"><span className="font-bold text-primary">Top P / Top K:</span> Nucleus sampling parameters controlling candidate token selection.</div>
                    <div className="p-4 rounded-xl bg-card border"><span className="font-bold text-primary">System Instructions:</span> Persona and guardrail constraints applied before the prompt.</div>
                  </div>
                </div>
                <CodeBlock 
                  language="typescript"
                  code={`
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: 'Write a haiku about cloud computing.',
  config: {
    temperature: 0.7,
    topP: 0.8,
    topK: 40,
    systemInstruction: 'You are a poetic AI engineer.'
  }
});

console.log(response.text);
                  `}
                />
              </div>
            </SlideContent>
          </Slide>
        )
      case 10:
        return (
          <Slide>
            <SlideTitle>Gemini Multimodal Capabilities</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-primary">Native Multimodality</h3>
                  <p className="text-xl text-muted-foreground">
                    Unlike earlier models that stitched separate vision and audio models together, Gemini was built natively multimodal from the ground up to reason across Text, Images, Audio, Video, and Code.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-2xl bg-card flex items-center gap-3 font-bold"><Palette className="text-primary h-5 w-5" /> Image Analysis</div>
                    <div className="p-4 border rounded-2xl bg-card flex items-center gap-3 font-bold"><FileText className="text-orange-500 h-5 w-5" /> PDF & Documents</div>
                    <div className="p-4 border rounded-2xl bg-card flex items-center gap-3 font-bold"><MonitorSmartphone className="text-green-500 h-5 w-5" /> Video Understanding</div>
                    <div className="p-4 border rounded-2xl bg-card flex items-center gap-3 font-bold"><Binary className="text-purple-500 h-5 w-5" /> Audio & Speech</div>
                  </div>
                </div>
                <CodeBlock 
                  language="typescript"
                  code={`
// Analyzing an image alongside text
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: [
    {
      inlineData: {
        data: 'base64_encoded_image_data_here',
        mimeType: 'image/jpeg'
      }
    },
    'Explain the architectural diagram in this image.'
  ]
});
                  `}
                />
              </div>
            </SlideContent>
          </Slide>
        )
      case 11:
        return (
          <Slide>
            <SlideTitle>Gemini vs OpenAI Comparison</SlideTitle>
            <SlideContent>
              <div className="overflow-x-auto w-full max-w-5xl mx-auto border rounded-3xl bg-card/50 backdrop-blur shadow-2xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-4 font-bold text-sm uppercase">Feature</th>
                      <th className="p-4 font-bold text-sm uppercase text-primary">Google Gemini (1.5 / 2.5)</th>
                      <th className="p-4 font-bold text-sm uppercase text-muted-foreground">OpenAI (GPT-4o)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="p-4 font-bold text-sm">Context Window</td>
                      <td className="p-4 text-sm font-mono text-primary font-bold">Up to 2,000,000 Tokens</td>
                      <td className="p-4 text-sm font-mono text-muted-foreground">128,000 Tokens</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-sm">Multimodality</td>
                      <td className="p-4 text-sm">Native (Text, Image, Audio, Video, Code)</td>
                      <td className="p-4 text-sm">Native (Text, Image, Audio)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-sm">Video Processing</td>
                      <td className="p-4 text-sm font-semibold text-green-500">Full Video & Audio reasoning</td>
                      <td className="p-4 text-sm text-muted-foreground">Frame sampling</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-sm">Ecosystem Integration</td>
                      <td className="p-4 text-sm">Google Cloud, Vertex AI, Google Workspace</td>
                      <td className="p-4 text-sm">Microsoft Azure</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SlideContent>
          </Slide>
        )
      case 12:
        return (
          <Slide>
            <SlideTitle>Simple Gemini Chatbot Example</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-primary">Live Chat Assistant</h3>
                  <p className="text-xl text-muted-foreground">
                    This interactive demo showcases a streaming conversation loop. In production, this connects to Next.js API routes streaming tokens directly from the Gemini API.
                  </p>
                </div>
                <AIChatBot />
              </div>
            </SlideContent>
          </Slide>
        )

      // PART 3 - REAL-WORLD LLM APP ARCHITECTURE
      case 13:
        return (
          <Slide>
            <SlideTitle>Frontend → Backend → LLM API Flow</SlideTitle>
            <SlideContent>
              <div className="flex flex-col items-center justify-center h-full space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl items-center">
                  <div className="p-8 bg-card border rounded-3xl space-y-4 text-center relative group shadow">
                    <MonitorSmartphone className="h-12 w-12 text-blue-500 mx-auto" />
                    <h3 className="font-bold text-xl">1. React / Next.js UI</h3>
                    <p className="text-xs text-muted-foreground">User submits prompt. UI manages loading state and renders streaming markdown.</p>
                    <ArrowRight className="absolute -right-6 top-1/2 -translate-y-1/2 h-8 w-8 text-primary hidden md:block" />
                  </div>
                  <div className="p-8 bg-primary/10 border border-primary rounded-3xl space-y-4 text-center relative group shadow-lg shadow-primary/10">
                    <Server className="h-12 w-12 text-primary mx-auto" />
                    <h3 className="font-bold text-xl">2. FastAPI Backend</h3>
                    <p className="text-xs text-muted-foreground">Handles auth, rate limiting, RAG retrieval, and prompt augmentation.</p>
                    <ArrowRight className="absolute -right-6 top-1/2 -translate-y-1/2 h-8 w-8 text-primary hidden md:block" />
                  </div>
                  <div className="p-8 bg-card border rounded-3xl space-y-4 text-center relative group shadow">
                    <Cpu className="h-12 w-12 text-yellow-500 mx-auto" />
                    <h3 className="font-bold text-xl">3. Gemini API</h3>
                    <p className="text-xs text-muted-foreground">Processes prompt and streams tokens back to backend via Server-Sent Events.</p>
                  </div>
                </div>
              </div>
            </SlideContent>
          </Slide>
        )
      case 14:
        return (
          <Slide>
            <SlideTitle>Role of FastAPI Backend</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-primary">Why Decouple Frontend from AI?</h3>
                  <p className="text-xl text-muted-foreground">
                    While Next.js API routes are great, production enterprise AI apps often pair React with a dedicated Python backend like <strong>FastAPI</strong>.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500 h-6 w-6 shrink-0" /> <span>Python AI Ecosystem (LangChain, LlamaIndex, native SDKs)</span></li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500 h-6 w-6 shrink-0" /> <span>High-performance asynchronous execution</span></li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500 h-6 w-6 shrink-0" /> <span>Heavy background tasks (PDF parsing, ETL pipelines)</span></li>
                  </ul>
                </div>
                <CodeBlock 
                  language="python"
                  code={`
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from google import genai

app = FastAPI()
ai = genai.Client()

@app.post("/generate")
async def generate(prompt: str):
    response = ai.models.generate_content_stream(
        model="gemini-2.5-flash",
        contents=prompt
    )
    return StreamingResponse(
        (chunk.text for chunk in response), 
        media_type="text/event-stream"
    )
                  `}
                />
              </div>
            </SlideContent>
          </Slide>
        )
      case 15:
        return (
          <Slide>
            <SlideTitle>Databases & Vector DBs in Production</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-card border-border">
                  <CardContent className="p-6 space-y-4">
                    <Database className="h-8 w-8 text-blue-500" />
                    <h3 className="font-bold text-lg">Relational (PostgreSQL)</h3>
                    <p className="text-sm text-muted-foreground">Stores user accounts, payment history, chat session IDs, and structured metadata.</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 space-y-4">
                    <Layers className="h-8 w-8 text-purple-500" />
                    <h3 className="font-bold text-lg">Vector DBs (Pinecone / Qdrant)</h3>
                    <p className="text-sm text-muted-foreground">Stores high-dimensional document embeddings for sub-second semantic RAG retrieval.</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border">
                  <CardContent className="p-6 space-y-4">
                    <History className="h-8 w-8 text-orange-500" />
                    <h3 className="font-bold text-lg">Caching (Redis)</h3>
                    <p className="text-sm text-muted-foreground">Caches identical LLM prompt responses to reduce API latency from 2s to 10ms and save API costs.</p>
                  </CardContent>
                </Card>
              </div>
            </SlideContent>
          </Slide>
        )
      case 16:
        return (
          <Slide>
            <SlideTitle>Deployment Basics</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                <Card className="bg-card border-border flex flex-col justify-between">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-xl">V</div>
                    <h3 className="font-bold text-xl">Vercel / Next.js</h3>
                    <p className="text-sm text-muted-foreground">Hosts the React frontend and edge API routes. Best for auto-scaling UI and instant CI/CD deployments.</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border flex flex-col justify-between">
                  <CardContent className="p-6 space-y-4">
                    <Server className="h-12 w-12 text-primary" />
                    <h3 className="font-bold text-xl">Google Cloud Run</h3>
                    <p className="text-sm text-muted-foreground">Serverless container hosting for the FastAPI Python backend. Scales to zero, handles heavy AI workloads seamlessly.</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border flex flex-col justify-between">
                  <CardContent className="p-6 space-y-4">
                    <Binary className="h-12 w-12 text-green-500" />
                    <h3 className="font-bold text-xl">Docker Containers</h3>
                    <p className="text-sm text-muted-foreground">Packages the Python backend and system dependencies (PDF parsers, OCR tools) into reproducible artifacts.</p>
                  </CardContent>
                </Card>
              </div>
            </SlideContent>
          </Slide>
        )
      case 17:
        return (
          <Slide>
            <SlideTitle>Production AI Application Overview</SlideTitle>
            <SlideContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-full items-center">
                <div className="space-y-8">
                  <h3 className="text-3xl font-bold tracking-tight">Summary: The Modern AI Stack</h3>
                  <ul className="space-y-4">
                    {[
                      "Decouple UI (Next.js) from AI business logic (FastAPI).",
                      "Leverage Gemini 1.5/2.5 for massive context windows & multimodal reasoning.",
                      "Pair Vector DBs (RAG) with Redis caching for speed.",
                      "Always implement Guardrails and secure API key management."
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-lg font-medium">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col justify-center items-center text-center p-12 rounded-[3rem] bg-gradient-to-br from-yellow-500 to-primary text-white space-y-6 shadow-2xl">
                  <Sparkles className="h-24 w-24 animate-bounce opacity-90" />
                  <h3 className="text-4xl font-bold">You're Ready to Build.</h3>
                  <p className="text-white/90 text-xl max-w-sm leading-relaxed">
                    You have mastered the complete architecture required to build, scale, and deploy production-grade AI systems.
                  </p>
                </div>
              </div>
            </SlideContent>
          </Slide>
        )
      default:
        return null
    }
  }

  if (viewMode === 'index') {
    return <CurriculumIndex />
  }

  return (
    <PresentationLayout>
      {currentTopicId === 'rag' ? renderRagSlide() : renderGeminiSlide()}
    </PresentationLayout>
  )
}
