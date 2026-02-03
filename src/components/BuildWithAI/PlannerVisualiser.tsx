import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { ChevronDown, ChevronUp, FileText, Globe, Layers, Users, Zap } from 'lucide-react'

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
    suggestedFields?: Record<string, any>
    atoms?: string[]
  }>
  rationaleSummary: string
}

type Props = { plannerOutput: PlannerOutput; compact?: boolean }

const Container = styled.div`
  max-width: 900px;
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
  gap: 2rem;
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
