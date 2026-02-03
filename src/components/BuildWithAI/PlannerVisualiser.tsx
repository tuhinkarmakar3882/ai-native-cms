import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  Globe,
  Info,
  Layers,
  Lightbulb,
  ListChecks,
  Shield,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react'

export type PlannerOutput = {
  pageIntent: string
  inputBrief: {
    pagePurpose: string
    targetAudience: string
    keyMessage: string
    productOrService: string
    toneOrStyle?: string
    constraints?: Record<string, any>
  }
  blocks: Array<{
    blockType: string
    reason: string
    score: number
    sampleContent: string
    suggestedFields?: Record<string, any>
    atoms?: string[]
  }>
  rationaleSummary: string
  composerData?: {
    contentOutline?: {
      purpose: string
      structure: Array<{ blockType: string; talkingPoints: string[] }>
    }
    learningObjectives?: {
      purpose: string
      structure: string[]
    }
    keyTermsGlossary?: {
      purpose: string
      structure: Record<string, string>
    }
    evidenceNotes?: {
      purpose: string
      structure: Array<{ blockType: string; expectedEvidence: string[] }>
    }
    misconceptionsToAddress?: {
      purpose: string
      structure: Array<{ blockType: string; misconceptions: string[] }>
    }
    visualGuidance?: {
      purpose: string
      structure: Array<{ blockType: string; visualIntent: string[] }>
    }
    readingDepthFlags?: {
      purpose: string
      structure: Array<{
        blockType: string
        depth: 'introductory' | 'intermediate' | 'advanced'
      }>
    }
    contentConstraints?: {
      purpose: string
      structure: {
        readingLevel: string
        toneConsistency: string
        maxSectionLength: string
        neutralityOrBiasRules: string
      }
    }
    assessmentOrDiscussionPrompts?: {
      purpose: string
      structure: Array<{ blockType: string; prompts: string[] }>
    }
    internalConsistencyChecks?: {
      purpose: string
      structure: string[]
    }
  }
}

type Props = { plannerOutput: PlannerOutput; compact?: boolean }

const Container = styled.div`
  max-width: 980px;
  margin: auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  color: white;
`

const Header = styled.header`
  border-bottom: 1px solid #3a3a3a;
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
`

const HeaderTitle = styled.h1`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.25;
`

const HeaderSub = styled.p`
  margin-top: 1rem;
  margin-bottom: 2rem;
  color: #d2d2d2;
`

const BriefGrid = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`

const BriefCard = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
  background-color: #333;
`

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
`

const Input = styled.input`
  flex: 1;
  border: 1px solid #1f2937;
  border-radius: 0.375rem;
  padding: 12px 16px;
  font-size: 14px;
  color: #eee;
  background: #1f1f1f;

  &:focus {
    outline: none;
    border-color: #9ca3af;
    box-shadow: 0 0 0 2px rgba(156, 163, 175, 0.2);
  }
`

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #4b5563;
`

const BlocksSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const BlockCard = styled.article`
  border-radius: 0.5rem;
  padding: 1rem;
  margin-block: 0.5rem;
  background-color: #2a2a2a;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s;
  color: white;
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
  }
`

const BlockHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`

const BlockTitleContainer = styled.div`
  display: flex;
  gap: 0.75rem;
`

const BlockIndex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;
  color: #eee;
`

const BlockContent = styled.div<{ open?: boolean }>`
  margin-top: 2rem;
  border-top: 1px solid #3a3a3a;
  padding-top: 1rem;
  color: #ccc;
  display: ${(props) => (props.open ? 'block' : 'none')};
`

const AtomsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.25rem;
`

const AtomBadge = styled.span`
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  background-color: #f3f4f6;
  border-radius: 0.25rem;
  color: #374151;
`

const ComposerSection = styled.section`
  margin-top: 2rem;
  border-top: 1px solid #3a3a3a;
  padding-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const ComposerCard = styled.div`
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: #2a2a2a;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`

const ComposerTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #fff;
  text-transform: capitalize;
`

const ComposerBody = styled.div`
  font-size: 0.875rem;
  color: #ccc;
  line-height: 1.6;
`

const ComposerList = styled.ul`
  margin: 0;
  padding-left: 1.25rem;
`

const ComposerKeyValue = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 0.5rem;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`

const KVItem = styled.div`
  padding: 0.75rem;
  border-radius: 0.375rem;
  background: #1f1f1f;
  border: 1px solid #333;
`

const KLabel = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
  margin-bottom: 0.25rem;
`

const KValue = styled.div`
  font-size: 0.875rem;
  color: #eee;
  word-break: break-word;
`

const Footer = styled.footer`
  margin-top: 1.5rem;
  border-top: 1px solid #3a3a3a;
  padding-top: 1rem;
  color: #ccc;

  p {
    line-height: 1.75;
    font-size: 14px;
  }
`

const FooterTitle = styled.h4`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #fff;
`

function IconForComposer(key: string) {
  switch (key) {
    case 'contentOutline':
      return <BookOpen size={18} />
    case 'learningObjectives':
      return <Lightbulb size={18} />
    case 'keyTermsGlossary':
      return <CheckCircle2 size={18} />
    case 'evidenceNotes':
      return <Shield size={18} />
    case 'misconceptionsToAddress':
      return <Sparkles size={18} />
    case 'visualGuidance':
      return <ListChecks size={18} />
    case 'readingDepthFlags':
      return <Info size={18} />
    case 'contentConstraints':
      return <Layers size={18} />
    case 'assessmentOrDiscussionPrompts':
      return <Globe size={18} />
    case 'internalConsistencyChecks':
      return <Zap size={18} />
    default:
      return <Zap size={18} />
  }
}

function renderComposerSection(plannerOutput: PlannerOutput) {
  const composer = plannerOutput.composerData
  if (!composer) return null

  const entries = Object.entries(composer).filter(([, v]) => v !== undefined && v !== null)

  if (entries.length === 0) return null

  return (
    <ComposerSection>
      {entries.map(([key, value]) => {
        const icon = IconForComposer(key)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const v: any = value

        return (
          <ComposerCard key={key}>
            <ComposerTitle>
              {icon}
              {key}
            </ComposerTitle>

            <ComposerBody>
              {v.purpose && <p style={{ marginTop: 0, marginBottom: '0.75rem' }}>{v.purpose}</p>}

              {key === 'contentOutline' && Array.isArray(v.structure) && (
                <ComposerList>
                  {v.structure.map((item: any, idx: number) => (
                    <li key={idx}>
                      <strong>{item.blockType}</strong>
                      <ul style={{ marginTop: '0.25rem', marginBottom: '0.5rem' }}>
                        {(item.talkingPoints || []).map((tp: string, i: number) => (
                          <li key={i}>{tp}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ComposerList>
              )}

              {key === 'learningObjectives' && Array.isArray(v.structure) && (
                <ComposerList>
                  {v.structure.map((obj: string, idx: number) => (
                    <li key={idx}>{obj}</li>
                  ))}
                </ComposerList>
              )}

              {key === 'keyTermsGlossary' && v.structure && (
                <ComposerKeyValue>
                  {Object.entries(v.structure).map(([term, def]) => (
                    <KVItem key={term}>
                      <KLabel>{term}</KLabel>
                      <KValue>{def}</KValue>
                    </KVItem>
                  ))}
                </ComposerKeyValue>
              )}

              {key === 'evidenceNotes' && Array.isArray(v.structure) && (
                <ComposerList>
                  {v.structure.map((item: any, idx: number) => (
                    <li key={idx}>
                      <strong>{item.blockType}</strong>
                      <ul style={{ marginTop: '0.25rem', marginBottom: '0.5rem' }}>
                        {(item.expectedEvidence || []).map((e: string, i: number) => (
                          <li key={i}>{e}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ComposerList>
              )}

              {key === 'misconceptionsToAddress' && Array.isArray(v.structure) && (
                <ComposerList>
                  {v.structure.map((item: any, idx: number) => (
                    <li key={idx}>
                      <strong>{item.blockType}</strong>
                      <ul
                        style={{
                          marginTop: '0.25rem',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {(item.misconceptions || []).map((m: string, i: number) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ComposerList>
              )}

              {key === 'visualGuidance' && Array.isArray(v.structure) && (
                <ComposerList>
                  {v.structure.map((item: any, idx: number) => (
                    <li key={idx}>
                      <strong>{item.blockType}</strong>
                      <ul style={{ marginTop: '0.25rem', marginBottom: '0.5rem' }}>
                        {(item.visualIntent || []).map((vi: string, i: number) => (
                          <li key={i}>{vi}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ComposerList>
              )}

              {key === 'readingDepthFlags' && Array.isArray(v.structure) && (
                <ComposerList>
                  {v.structure.map((item: any, idx: number) => (
                    <li key={idx}>
                      <strong>{item.blockType}</strong>: {item.depth}
                    </li>
                  ))}
                </ComposerList>
              )}

              {key === 'contentConstraints' && v.structure && (
                <ComposerKeyValue>
                  {Object.entries(v.structure).map(([label, val]) => (
                    <KVItem key={label}>
                      <KLabel>{label}</KLabel>
                      <KValue>{val}</KValue>
                    </KVItem>
                  ))}
                </ComposerKeyValue>
              )}

              {key === 'assessmentOrDiscussionPrompts' && Array.isArray(v.structure) && (
                <ComposerList>
                  {v.structure.map((item: any, idx: number) => (
                    <li key={idx}>
                      <strong>{item.blockType}</strong>
                      <ul
                        style={{
                          marginTop: '0.25rem',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {(item.prompts || []).map((p: string, i: number) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ComposerList>
              )}

              {key === 'internalConsistencyChecks' && Array.isArray(v.structure) && (
                <ComposerList>
                  {v.structure.map((check: string, idx: number) => (
                    <li key={idx}>{check}</li>
                  ))}
                </ComposerList>
              )}
            </ComposerBody>
          </ComposerCard>
        )
      })}
    </ComposerSection>
  )
}

export function PlannerVisualizer({ plannerOutput, compact = false }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [query, setQuery] = useState('')
  const [showOnlyTop, setShowOnlyTop] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return plannerOutput.blocks.filter((b) => {
      if (showOnlyTop && b.score < 5) return false
      if (!q) return true
      return (
        b.blockType.toLowerCase().includes(q) ||
        b.reason.toLowerCase().includes(q) ||
        (b.atoms || []).some((a) => a.toLowerCase().includes(q))
      )
    })
  }, [plannerOutput.blocks, query, showOnlyTop])

  const toggleOpen = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <Container>
      {/* Header */}
      <Header>
        <HeaderTitle>
          <FileText size={36} /> {plannerOutput.pageIntent}
        </HeaderTitle>
        <HeaderSub>{plannerOutput.inputBrief.keyMessage}</HeaderSub>

        <BriefGrid>
          {[
            {
              icon: Users,
              label: 'Audience',
              value: plannerOutput.inputBrief.targetAudience,
            },
            {
              icon: Globe,
              label: 'Purpose',
              value: plannerOutput.inputBrief.pagePurpose,
            },
            {
              icon: Zap,
              label: 'Tone',
              value: plannerOutput.inputBrief.toneOrStyle || '—',
            },
          ].map((item) => (
            <BriefCard key={item.label}>
              <item.icon size={24} color="white" />
              <div>
                <p style={{ fontSize: '0.875rem', color: '#ccc' }}>{item.label}</p>
                <p style={{ fontSize: '0.875rem', color: '#eee' }}>{item.value}</p>
              </div>
            </BriefCard>
          ))}
        </BriefGrid>
      </Header>

      {/* Filters */}
      <Filters>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search blocks..."
        />
        <CheckboxLabel>
          <input
            type="checkbox"
            checked={showOnlyTop}
            onChange={(e) => setShowOnlyTop(e.target.checked)}
          />
          Show only top scoring
        </CheckboxLabel>
      </Filters>

      {/* Blocks */}
      <BlocksSection>
        {filtered.map((block, idx) => {
          const isOpen = openIndex === idx
          return (
            <BlockCard key={idx}>
              <BlockHeader>
                <BlockTitleContainer>
                  <BlockIndex>
                    <span>#{idx + 1}</span>
                    <span>{block.score}</span>
                  </BlockIndex>
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <Layers size={16} color="#6b7280" />
                      <strong style={{ textTransform: 'capitalize' }}>{block.blockType}</strong>
                    </div>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: '#eee',
                        marginTop: '0.25rem',
                      }}
                    >
                      {block.reason}
                    </p>

                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: '#eee',
                        marginTop: '1rem',
                      }}
                    >
                      <strong>Sample Content:</strong> {block?.sampleContent}
                    </p>
                  </div>
                </BlockTitleContainer>
                <button
                  onClick={() => toggleOpen(idx)}
                  style={{
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    color: '#eee',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  {isOpen ? (
                    <>
                      Hide <ChevronUp size={14} />
                    </>
                  ) : (
                    <>
                      Details <ChevronDown size={14} />
                    </>
                  )}
                </button>
              </BlockHeader>

              <BlockContent open={isOpen}>
                {block.suggestedFields && (
                  <div>
                    <strong>Suggested fields:</strong>
                    <pre
                      style={{
                        background: '#2a2a2a',
                        padding: '0.5rem',
                        borderRadius: '0.25rem',
                        marginTop: '0.25rem',
                        overflowX: 'auto',
                      }}
                    >
                      {JSON.stringify(block.suggestedFields, null, 2)}
                    </pre>
                  </div>
                )}
                {block.atoms && block.atoms.length > 0 && (
                  <div>
                    <strong>Atoms:</strong>
                    <AtomsContainer>
                      {block.atoms.map((a) => (
                        <AtomBadge key={a}>{a}</AtomBadge>
                      ))}
                    </AtomsContainer>
                  </div>
                )}
              </BlockContent>
            </BlockCard>
          )
        })}
      </BlocksSection>

      {/* ComposerData */}
      {renderComposerSection(plannerOutput)}

      {/* Rationale */}
      <Footer>
        <FooterTitle>
          <Zap size={16} /> Rationale Summary
        </FooterTitle>
        <p>{plannerOutput.rationaleSummary}</p>
      </Footer>
    </Container>
  )
}
