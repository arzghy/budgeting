# Graph Report - budgeting  (2026-09-15)

## Corpus Check
- 242 files · ~590,141 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 4343 nodes · 9897 edges · 215 communities (178 shown, 27 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 129 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `17564877`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- graphify-out/graph.json
- dbConnect
- dependencies
- compilerOptions
- devDependencies
- context-signals.mjs
- NeedsPage
- live-browser.js
- AuthForm
- WishlistPage
- MiBudge — arah produk dan rombak UI
- ExpensesPage
- Whale Budgeting
- SavePage
- Requirements - Website Budgeting
- next.config.mjs
- next-env.d.ts
- tailwind.config.ts
- tanstack-adapter.mjs
- Integrate <KageLandingPage /> from ThreeUI using its exact source
- todo.md
- checks.mjs
- design-system.mjs
- connectSSE
- injected/index.mjs
- detect-antipatterns-browser.js
- css-cascade.mjs
- documentRefForElement
- live-server.mjs
- hook-lib.mjs
- concept-seed.mjs
- svelte-component.mjs
- setLiveState
- parseRgb
- font-match.mjs
- detect-text.mjs
- detect-antipatterns.mjs
- modern-screenshot.umd.js
- el
- manual-apply.mjs
- syncPageChatFocus
- live-commit-manual-edits.mjs
- hook-before-edit.mjs
- impeccable-config.mjs
- hook-admin.mjs
- impeccable/SKILL.md
- checkHtmlPatterns
- live-accept.mjs
- live-copy-edit-agent.mjs
- live-wrap.mjs
- build-phase.mjs
- live-poll.mjs
- initGlobalBar
- comp-diff.mjs
- comp-spec.mjs
- critique-storage.mjs
- insert-ui.mjs
- design-parser.mjs
- detect-html.mjs
- ItemsPage
- live-inject.mjs
- event-validation.mjs
- showToast
- roots.mjs
- parseRgb
- discoverTargetCandidates
- live-status.mjs
- extractFindingIgnoreValue
- parseAnyColor
- session-store.mjs
- impeccable-paths.mjs
- collectBrowserFindings
- target-args.mjs
- manual-edit-routes.mjs
- Responsive Design
- live.md
- document.md
- serve-question.mjs
- accept-css.mjs
- handleManualEditActivity
- svelte-ast.mjs
- onboard.md
- checkQuality
- sveltekit-adapter.mjs
- Extract Flow
- Operate mode depth (and Read notes)
- The Toolkit
- 🛠️ 4. Phased Step-by-Step Execution Plan
- resolveLengthPx
- Design Audit
- generate-image.mjs
- runHook
- captureElementToBlob
- staleness.mjs
- StaticElement
- onAnnotDown
- renderGroupedTemplate
- createLiveBrowserSessionState
- pin.mjs
- image-metrics.mjs
- tag-strategy.mjs
- animate.md
- Handle `generate`
- checkHeadingRhythmDOM
- createLiveBrowserDomHelpers
- tasteskill: Anti-Slop Frontend Skill
- Appendix B - Canonical Sources (read these before reinventing)
- Generate Report
- sampleCssBackground
- checkHeadingRhythmDOM
- png.mjs
- New visual work
- optimize.md
- parseAnyColor
- components.json
- embed-prompt.mjs
- frameworks/index.mjs
- template-extensions.mjs
- handlePollPost
- checkElementDesignSystemDOM
- appendSanitizedCssRule
- detect-utils.mjs
- 4. DESIGN ENGINEERING DIRECTIVES (Bias Correction)
- critique.md
- Simplify the Design
- Hardening Dimensions
- live.mjs
- clarify.md
- Nielsen's 10 Heuristics
- polish.md
- quieter.md
- detect-csp.mjs
- generation-preflight.mjs
- palette.mjs
- 10. REFERENCE VOCABULARY (Pattern Names the Agent Should Know)
- ImageCropModal.tsx
- browser-script-parts.mjs
- Generate Combined Critique Report
- Init flow
- staleness-notice.mjs
- doctor.mjs
- inline-ignores.mjs
- 21st
- nuxt.mjs
- Common Cognitive Load Violations
- iOS platform
- Shape
- package.json
- 9. AI TELLS (Forbidden Patterns)
- Android platform
- Persona-Based Design Testing
- live-setup.md
- applyDeferredSvelteComponentAccepts
- app/layout.tsx
- APPENDICES - Real Source-Backed Reference Material
- 11. REDESIGN PROTOCOL
- 3. DEFAULT ARCHITECTURE & CONVENTIONS
- 6. PERFORMANCE & ACCESSIBILITY GUARDRAILS
- Cognitive Load Assessment
- Impeccable Asset Producer
- Impeccable Finish Reviewer
- Impeccable Manual Edit Applier
- hook.mjs
- live-browser-ignores.js
- Diagnostic Scan
- 12. THE BLOCK LIBRARY (Contract - Implementations Land Here Iteratively)
- 5. CONTEXT-AWARE PROACTIVITY
- 8. DARK MODE PROTOCOL
- Impeccable Documenter
- context.mjs
- 7. DIAL DEFINITIONS (Technical Reference)
- Heuristics Scoring Guide
- detect.mjs
- checkElementRadialSpotlightDOM
- Frontend Design
- cloudinary
- @fortawesome/free-solid-svg-icons
- @gsap/react
- extends
- mongoose
- next
- zustand
- clsx
- @fortawesome/fontawesome-svg-core
- WhaleScene.tsx
- checkFlatTypeHierarchyFromDoc
- LandingExperience.tsx
- readProjectPatternGroups
- lenis
- gsap
- normalizeGitHubEvent
- lucide-react
- react-dom
- shadcn
- lottie-react
- next-auth
- react
- Navbar.tsx
- live-complete.mjs
- source-lock.mjs
- @react-three/drei
- three
- Generate Report
- Visualize: Direction Comps & Asset Production
- Adaptation Strategies

## God Nodes (most connected - your core abstractions)
1. `parseAnyColor()` - 46 edges
2. `parseAnyColor()` - 45 edges
3. `dbConnect()` - 45 edges
4. `runHook()` - 41 edges
5. `collectBrowserFindings()` - 38 edges
6. `auth()` - 38 edges
7. `setLiveState()` - 32 edges
8. `connectSSE()` - 30 edges
9. `createRequestHandler()` - 30 edges
10. `detectHtml()` - 29 edges

## Surprising Connections (you probably didn't know these)
- `Dashboard()` --calls--> `dbConnect()`  [EXTRACTED]
  app/dashboard/page.tsx → lib/mongodb.ts
- `collect()` --indirect_call--> `parseDesignMd()`  [INFERRED]
  .opencode/skills/impeccable/scripts/doctor.mjs → .opencode/skills/impeccable/scripts/lib/design-parser.mjs
- `collect()` --indirect_call--> `checkNativePlatformEvidence()`  [INFERRED]
  .opencode/skills/impeccable/scripts/doctor.mjs → .opencode/skills/impeccable/scripts/lib/staleness.mjs
- `enableInlineEdit()` --indirect_call--> `own()`  [INFERRED]
  .opencode/skills/impeccable/scripts/live-browser.js → .opencode/skills/impeccable/scripts/live-browser-dom.js
- `layoutFlowChildren()` --indirect_call--> `pickable()`  [INFERRED]
  .opencode/skills/impeccable/scripts/live-browser.js → .opencode/skills/impeccable/scripts/live-browser-dom.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **post-edit graph maintenance workflow** — graphify_update, graphify_out_graph_json, claude_md_graphify [EXTRACTED 0.85]
- **graphify codebase question workflow** — claude_md_graphify, graphify_query, graphify_out_graph_json, graphify_out_wiki_index [EXTRACTED 0.85]

## Communities (215 total, 27 thin omitted)

### Community 0 - "graphify-out/graph.json"
Cohesion: 0.39
Nodes (8): graphify project knowledge graph, graphify explain, graphify-out/graph.json, graphify-out/GRAPH_REPORT.md, graphify-out/wiki/index.md, graphify path, graphify query, graphify update .

### Community 1 - "dbConnect"
Cohesion: 0.05
Nodes (65): handler, auth(), authOptions, POST(), invalidCode(), POST(), sendResetEmail(), DELETE() (+57 more)

### Community 2 - "dependencies"
Cohesion: 0.10
Nodes (21): @auth/mongodb-adapter, @base-ui/react, class-variance-authority, @fortawesome/free-brands-svg-icons, @fortawesome/react-fontawesome, mongodb, dependencies, @auth/mongodb-adapter (+13 more)

### Community 3 - "compilerOptions"
Cohesion: 0.07
Nodes (26): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+18 more)

### Community 4 - "devDependencies"
Cohesion: 0.10
Nodes (21): autoprefixer, eslint, eslint-config-next, devDependencies, autoprefixer, eslint, eslint-config-next, postcss (+13 more)

### Community 5 - "context-signals.mjs"
Cohesion: 0.24
Nodes (12): cli(), COMMON_DEV_PORTS, devServerSignals(), gatherSignals(), gitSignals(), hasCode(), isVendoredPath(), latestCritique() (+4 more)

### Community 6 - "NeedsPage"
Cohesion: 0.29
Nodes (11): DIVISIONS, formatRp(), Need, NeedsPage(), load(), NeedRow(), remove(), reset() (+3 more)

### Community 7 - "live-browser.js"
Cohesion: 0.03
Nodes (132): acceptedDomAlreadyClean(), applyParamValue(), applyPlaceholderSizingStyles(), bindEditBadgeProxy(), bufferToBase64(), buildCollapsible(), buildColorModels(), buildListHtml() (+124 more)

### Community 9 - "WishlistPage"
Cohesion: 0.29
Nodes (9): formatRp(), Wish, WishlistPage(), load(), purchase(), remove(), reset(), submit() (+1 more)

### Community 10 - "MiBudge — arah produk dan rombak UI"
Cohesion: 0.12
Nodes (15): Arah desain, Arsitektur pengalaman, Auth, Batasan implementasi, Dashboard, Dial desain, Landing, MiBudge — arah produk dan rombak UI (+7 more)

### Community 11 - "ExpensesPage"
Cohesion: 0.23
Nodes (9): CLOTHING_SUBCATEGORIES, DIVISIONS, Expense, ExpensesPage(), loadData(), remove(), resetForm(), submitExpense() (+1 more)

### Community 12 - "Whale Budgeting"
Cohesion: 0.20
Nodes (9): Catatan, Deploy ke Vercel, Fitur, Setup Google OAuth, Setup Lokal, Setup MongoDB, Stack, Struktur (+1 more)

### Community 13 - "SavePage"
Cohesion: 0.36
Nodes (7): formatRp(), SavePage(), load(), remove(), submit(), Saving, Wish

### Community 14 - "Requirements - Website Budgeting"
Cohesion: 0.50
Nodes (3): Fitur, Requirements - Website Budgeting, Tujuan

### Community 18 - "tanstack-adapter.mjs"
Cohesion: 0.17
Nodes (18): tanstackStart, applyTanStackLiveAdapter(), buildTanStackLiveRootComponent(), detectTanStackStartProject(), escapeRegExp(), insertAfterLastImport(), isManagedComponent(), patchTanStackRoot() (+10 more)

### Community 21 - "Integrate <KageLandingPage /> from ThreeUI using its exact source"
Cohesion: 0.40
Nodes (4): Current configured usage, Exact implementation source, Implementation requirements, Integrate <KageLandingPage /> from ThreeUI using its exact source

### Community 23 - "checks.mjs"
Cohesion: 0.03
Nodes (112): ANIMATION_VALUE_KEYWORDS, borderColorsFromStyle(), borderWidthsFromStyle(), checkBorders(), checkClippedOverflow(), checkEdgeFlushCardsDOM(), checkElementBlinkingCursorDOM(), checkElementBorders() (+104 more)

### Community 24 - "design-system.mjs"
Cohesion: 0.05
Nodes (85): addClampEndpoints(), addColorObject(), addDesignColor(), addFontSizeStep(), addRoundedScale(), addRoundedToken(), addSidecarColors(), addSidecarRadii() (+77 more)

### Community 25 - "connectSSE"
Cohesion: 0.06
Nodes (83): abortSvelteComponentInjection(), applyParamDefaults(), applySavedSessionMeta(), buildInsertPlaceholderSnapshotFromDom(), checkpointPayload(), clampVariantIndex(), clearHandled(), clearMountErrorCard() (+75 more)

### Community 26 - "injected/index.mjs"
Cohesion: 0.06
Nodes (70): addBrowserFindings(), addVisualContrastFindings(), addVisualContrastResult(), analyzeVisualContrast(), analyzeVisualContrastCandidate(), blendRgba(), browserColorsClose(), browserDesignSystemConfig() (+62 more)

### Community 27 - "detect-antipatterns-browser.js"
Cohesion: 0.05
Nodes (65): addBrowserFindings(), addVisualContrastFindings(), addVisualContrastResult(), browserFindingsFromMap(), buildSelectorSegment(), checkClippedOverflow(), checkElementClippedOverflow(), checkElementClippedOverflowDOM() (+57 more)

### Community 28 - "css-cascade.mjs"
Cohesion: 0.07
Nodes (35): applyStaticDeclaration(), buildBorderOverrideMap(), parseShorthand(), resolveVar(), buildStaticStyleMap(), buildStaticWindow(), collectStaticCssRules(), compareStaticPriority() (+27 more)

### Community 29 - "documentRefForElement"
Cohesion: 0.07
Nodes (35): addManualContextText(), canRestoreManualEditElement(), collectEditableTextRows(), visit(), collectManualContextPieces(), walk(), contextElementForManualEdit(), copyEditContainerContext() (+27 more)

### Community 30 - "live-server.mjs"
Cohesion: 0.08
Nodes (42): activeSessionSummaries(), annotRoot, args, cleanupSvelteComponentSessionsBeforeExit(), createRequestHandler(), DEBUG_MANUAL_EDIT_EVENTS, detectMissedGenerationCompletion(), { detectScript, liveScriptParts } (+34 more)

### Community 31 - "hook-lib.mjs"
Cohesion: 0.05
Nodes (60): ACK_EXTS, ADVISORY_RULES, ALLOWED_EXTS, applyConfigSource(), applyDetectorConfigSource(), canonicalPath(), canonicalPathCache, clampByte() (+52 more)

### Community 32 - "concept-seed.mjs"
Cohesion: 0.06
Nodes (55): API_BASE, API_TIMEOUT_MS, apiBudgetMs(), dealCompositions(), driveSelection(), fetchRoll(), here, isMainModule() (+47 more)

### Community 33 - "svelte-component.mjs"
Cohesion: 0.09
Nodes (42): collectUnusedSelectors(), verifyAcceptedSource(), buildPropsScriptV2(), loadSvelteCompiler(), appendCssToSvelteStyle(), buildInsertVariantStub(), buildPropContract(), buildPropsScript() (+34 more)

### Community 34 - "setLiveState"
Cohesion: 0.10
Nodes (60): applyEditing(), beginNewLiveConfiguration(), buildLocatorForLeaf(), buildPickedAnchorSnapshot(), cancelEditing(), cancelEditingToPicking(), cancelInsertConfigure(), cleanup() (+52 more)

### Community 35 - "parseRgb"
Cohesion: 0.20
Nodes (20): checkElementColors(), checkElementColorsDOM(), checkElementHoverContrast(), checkElementIconTile(), checkElementIconTileDOM(), checkHoverContrast(), checkIconTile(), compositeGradientStops() (+12 more)

### Community 36 - "font-match.mjs"
Cohesion: 0.07
Nodes (55): gateSpec(), arg(), choiceStamped(), compactFp(), describe(), ensureWritableTmp(), isMain, loadBrowser() (+47 more)

### Community 37 - "detect-text.mjs"
Cohesion: 0.07
Nodes (48): blankAstroFrontmatterComments(), blankCommentsForMatchers(), blankCssComments(), blankCssLineComments(), blankCssLineCommentsInStyleBlocks(), blankHtmlAndCssCommentsOutsideScripts(), blankHtmlComments(), BLOCK_BRACE_PREFIX_KEYWORDS (+40 more)

### Community 38 - "detect-antipatterns.mjs"
Cohesion: 0.07
Nodes (48): confirm(), detectCli(), detectLocalFile(), dim(), fileUrlToLocalPath(), formatAdvisorySection(), formatFindings(), formatFindingsBody() (+40 more)

### Community 39 - "modern-screenshot.umd.js"
Cohesion: 0.09
Nodes (55): ae(), be(), bt(), Ce(), s(), Ct(), de(), dt() (+47 more)

### Community 40 - "el"
Cohesion: 0.07
Nodes (53): actionLabel(), applyConfigureBarChrome(), bindConfigureCountPillTooltip(), bindConfigureInlineControlHover(), bindConfigureModifierPillHover(), buildConfigureActionControl(), buildConfigureCountControl(), buildConfigureRow() (+45 more)

### Community 41 - "manual-apply.mjs"
Cohesion: 0.09
Nodes (49): addOpToManualApplyChunk(), APPLY_EVENT_HARD_TIMEOUT_MS, APPLY_EVENT_SOFT_DEADLINE_MS, buildManualApplyAgentAction(), clearManualApplyTransaction(), collectManualApplyFiles(), compactManualApplyBatch(), compactManualApplyCandidates() (+41 more)

### Community 42 - "syncPageChatFocus"
Cohesion: 0.08
Nodes (50): applyGlobalBarLabelState(), armPageChatForTyping(), attachSteerFocusDebug(), attachSteerFocusGuard(), buildSteerProcessingDots(), clearSteerAwaitTimer(), clearSteerFocusRecoverTimer(), collapsePageChat() (+42 more)

### Community 43 - "live-commit-manual-edits.mjs"
Cohesion: 0.10
Nodes (49): allEntryIds(), argVal(), buildRepairBatch(), candidatesForEntry(), changedFilesSinceSnapshot(), clearAppliedEntries(), collectApplyOwnedFiles(), collectRollbackFiles() (+41 more)

### Community 44 - "hook-before-edit.mjs"
Cohesion: 0.10
Nodes (46): allow(), bumpCursorDenial(), cursorBlockMessage(), deny(), detectProposedHtml(), done(), escapeRegExp(), findingSignature() (+38 more)

### Community 45 - "impeccable-config.mjs"
Cohesion: 0.10
Nodes (45): applyDetectionConfigSource(), clampByte(), cleanIgnoreValueDisplay(), cloneDetectionConfig(), cloneRawDetectionConfig(), COLOR_CHANNEL_FORMATS, colorIgnoreKey(), DEFAULT_DETECTION_CONFIG (+37 more)

### Community 46 - "hook-admin.mjs"
Cohesion: 0.12
Nodes (43): ACTIONS, addIgnoreFile(), addIgnoreRule(), addIgnoreValue(), DETECTOR_CONFIG_KEYS, detectorSection(), fileHasImpeccableHookMarker(), HOOK_MANIFEST_TARGETS (+35 more)

### Community 47 - "impeccable/SKILL.md"
Cohesion: 0.07
Nodes (28): Assess Adaptation Challenge, Implement & Verify, Recommended Actions, Craft (deprecated alias), Monorepo notes, Opting out of the boot check, Step 1: Run the pass, Step 2: Act by severity (+20 more)

### Community 48 - "checkHtmlPatterns"
Cohesion: 0.08
Nodes (43): buildHtmlPatternCorpora(), checkColors(), checkElementAIPaletteDOM(), checkElementGlow(), checkElementGlowDOM(), checkGlow(), checkHtmlPatterns(), checkRadialSpotlight() (+35 more)

### Community 49 - "live-accept.mjs"
Cohesion: 0.12
Nodes (38): acceptCli(), acceptReceiptPath(), argVal(), buildAcceptedWrappedSource(), buildCarbonizeReplacement(), decodeHtmlAttr(), deindentContent(), detectCommentSyntax() (+30 more)

### Community 50 - "live-copy-edit-agent.mjs"
Cohesion: 0.12
Nodes (42): applyMockWrites(), buildCopyEditBatchPrompt(), checkFrameworkSourceSyntax(), chooseCopyEditAgent(), COMMAND_AUTH_CACHE, commandAuthed(), commandExists(), compactBatchCandidates() (+34 more)

### Community 51 - "live-wrap.mjs"
Cohesion: 0.07
Nodes (63): hasGeneratedHeader(), HEADER_MARKERS, isGeneratedFile(), isGitIgnored(), resolveSourceTraits(), argVal(), buildInsertWrapperLines(), computeInsertLine() (+55 more)

### Community 52 - "build-phase.mjs"
Cohesion: 0.09
Nodes (40): advance(), arg(), compRoundOpen(), flag(), forceAllowed(), gateComps(), gateHero(), gateResponsive() (+32 more)

### Community 53 - "live-poll.mjs"
Cohesion: 0.10
Nodes (38): completionAckForAcceptResult(), completionTypeForAcceptResult(), PREVIEW_MODES_WITHOUT_SOURCE_MARKERS, acceptInstructions(), bootInstructions(), deferredWrapperInstructions(), generateInstructions(), insertScaffoldInstructions() (+30 more)

### Community 54 - "initGlobalBar"
Cohesion: 0.09
Nodes (38): agentHasWorkInFlight(), agentStatusText(), barPaletteForTheme(), brandMarkSvg(), buildDesignHeader(), buildParamsPanel(), buildSteerQueueHint(), designPanelCss() (+30 more)

### Community 55 - "comp-diff.mjs"
Cohesion: 0.14
Nodes (38): gatePlates(), heroReadings(), alignBuild(), arg(), bestShift(), buildReport(), compare(), DIRECTION_KINDS (+30 more)

### Community 56 - "comp-spec.mjs"
Cohesion: 0.10
Nodes (37): arg(), artworkTouchesEdges(), autoRegions(), BUILD_DIR, EDGE_CONTACT_MIN, energyOf(), flag(), GRID_PATH (+29 more)

### Community 57 - "critique-storage.mjs"
Cohesion: 0.13
Nodes (33): closeSnapshot(), coerceSlug(), fingerprintTarget(), isReadySlug(), listSnapshots(), main(), nowFilenameStamp(), parseFrontmatter() (+25 more)

### Community 58 - "insert-ui.mjs"
Cohesion: 0.09
Nodes (13): canCreateInsert(), clampPlaceholderSize(), computeInsertPosition(), groupSiblingRows(), hitSiblingInsertGap(), horizontalOverlap(), insertCreateDisabledReason(), insertLineCoords() (+5 more)

### Community 59 - "design-parser.mjs"
Cohesion: 0.14
Nodes (37): assessCoverage(), buildColor(), CANONICAL_SECTIONS, collectBullets(), collectColorValues(), collectParagraphs(), detectFormat(), extractColors() (+29 more)

### Community 60 - "detect-html.mjs"
Cohesion: 0.09
Nodes (34): applyOriginScopedAuth(), basicAuthHeader(), decodeUrlComponent(), detectUrl(), launchBrowser(), measureContentHiddenAfterReveal(), runVisualContrastFallback(), serializeDesignSystemForBrowser() (+26 more)

### Community 61 - "ItemsPage"
Cohesion: 0.22
Nodes (8): formatRp(), Item, ItemsPage(), load(), remove(), reset(), submit(), updateStock()

### Community 62 - "live-inject.mjs"
Cohesion: 0.13
Nodes (28): describeInjectArtifacts(), frameworkIgnorePatterns(), PATCH_UNDOERS, resolveFramework(), clearInjectJournal(), healArtifact(), healInjectJournal(), INJECT_JOURNAL_RELPATH (+20 more)

### Community 63 - "event-validation.mjs"
Cohesion: 0.12
Nodes (26): AGENT_PHASE_SET, FORBIDDEN_MANUAL_EDIT_TEXT_CHARS, INSERT_POSITIONS, isValidId(), isValidMountVariant(), isValidVariantId(), MOUNT_ERROR_MAX_LENGTH, MOUNT_URL_MAX_LENGTH (+18 more)

### Community 64 - "showToast"
Cohesion: 0.11
Nodes (27): abandonForeignSession(), applyOriginalAttrsToSvelteAnchor(), commitAcceptedSvelteComponentToDom(), componentModuleCandidates(), describeMountFailure(), detectDevServerBase(), discardOrphanedSession(), dismissToast() (+19 more)

### Community 65 - "roots.mjs"
Cohesion: 0.15
Nodes (27): CANDIDATE_SCAN_IGNORED, consumeTargetArg(), CONTEXT_FALLBACK_DIRS, DESIGN_NAMES, DEV_CONFIG_MARKERS, discoverAppCandidates(), enterLiveRoot(), exists() (+19 more)

### Community 66 - "parseRgb"
Cohesion: 0.15
Nodes (27): analyzeVisualContrast(), analyzeVisualContrastCandidate(), checkElementColors(), checkElementColorsDOM(), checkElementHoverContrast(), checkElementIconTile(), checkElementIconTileDOM(), checkHoverContrast() (+19 more)

### Community 67 - "discoverTargetCandidates"
Cohesion: 0.15
Nodes (21): directChildDirs(), discoverRootsForPattern(), discoverTargetCandidates(), escapeRegExp(), expandSimplePattern(), extractSectionValue(), findTargetExample(), hasFallbackWorkspaceChildren() (+13 more)

### Community 68 - "live-status.mjs"
Cohesion: 0.30
Nodes (13): collectManualApplyFiles(), manualApplyReplyCommand(), manualApplyResumeHint(), mountFailureAction(), parseArgs(), renderSummary(), resumeCli(), summarizeManualApplyEvent() (+5 more)

### Community 69 - "extractFindingIgnoreValue"
Cohesion: 0.23
Nodes (14): cleanIgnoreValueDisplay(), extractFindingIgnoreValue(), extractFindingIgnoreValueRaw(), extractMotionIgnoreValue(), filterFindings(), findingMatchesScopedIgnoreFile(), formatFindingIgnoreHint(), isAdvisoryFinding() (+6 more)

### Community 70 - "parseAnyColor"
Cohesion: 0.11
Nodes (26): checkBorders(), checkCreamPalette(), checkElementBorders(), checkElementBordersDOM(), clamp01(), colorFunctionToRgb(), creamFromClassList(), decodeSrgbChannel() (+18 more)

### Community 71 - "session-store.mjs"
Cohesion: 0.19
Nodes (19): getLiveSessionsDir(), safeSessionId(), applyEvent(), baseSnapshot(), COMPLETED_PHASES, createLiveSessionStore(), getReadableJournalPath(), persist() (+11 more)

### Community 72 - "impeccable-paths.mjs"
Cohesion: 0.15
Nodes (23): resolveProjectRoot(), CRITIQUE_DIR, firstExisting(), getDesignSidecarCandidates(), getDesignSidecarPath(), getImpeccableDir(), getLegacyLiveAnnotationsDir(), getLegacyLiveConfigPath() (+15 more)

### Community 73 - "collectBrowserFindings"
Cohesion: 0.12
Nodes (25): checkEdgeFlushCardsDOM(), checkElementBlinkingCursorDOM(), checkElementPseudoStripeDOM(), checkElementTextOverflowDOM(), checkFirstViewportColumnOverflowDOM(), checkRepeatedContainerTextDOM(), checkRepeatedContainerTextFromDoc(), checkTextOcclusionDOM() (+17 more)

### Community 74 - "target-args.mjs"
Cohesion: 0.39
Nodes (5): parseCliOptions(), parseTargetOptions(), parseTargetPath(), TargetArgError, resolveLiveTarget()

### Community 75 - "manual-edit-routes.mjs"
Cohesion: 0.18
Nodes (22): args, buffer, cwd, pageUrlFilter, remaining, compactManualLogText(), summarizeManualApplyFailures(), summarizeManualDiagnostics() (+14 more)

### Community 76 - "Responsive Design"
Cohesion: 0.08
Nodes (25): Assess Adaptation Challenge, Breakpoints: Content-Driven, Content Adaptation, Desktop Adaptation (Mobile → Desktop), Detect Input Method, Not Just Screen Size, Email Adaptation (Web → Email), Implement Adaptations, Layout Adaptation Patterns (+17 more)

### Community 77 - "live.md"
Cohesion: 0.08
Nodes (22): Apply at system scale, Audit before choosing, Choose a strategy, Contrast and perception, Live-mode signature params, Verify, Visitor mode, Cleanup (+14 more)

### Community 78 - "document.md"
Cohesion: 0.08
Nodes (23): Component translation rules, Narrative mapping, Pitfalls, Scan mode (approach C: auto-extract, then confirm descriptive language), Schema, Seed mode, Step 1: Find the design assets, Step 1: Route through new-work's workshop (+15 more)

### Community 79 - "serve-question.mjs"
Cohesion: 0.13
Nodes (20): browserOpenCommand(), openSystemBrowser(), allowedHost(), allowedOrigin(), answerFile(), esc(), flipFile(), idleGraceArg (+12 more)

### Community 80 - "accept-css.mjs"
Cohesion: 0.24
Nodes (20): bakeParamValues(), collectAllSelectors(), collectSelectorsFromNodes(), escapeRegExp(), formatBody(), isToggleOn(), normalizeSelector(), normalizeToggleForVar() (+12 more)

### Community 81 - "handleManualEditActivity"
Cohesion: 0.19
Nodes (24): clearStoredManualApplyState(), fetchPendingCount(), handleManualEditActivity(), hidePendingApplyDock(), manualApplyLoadingText(), manualApplyStateKey(), manualEditEventForCurrentPage(), numberOrNull() (+16 more)

### Community 82 - "svelte-ast.mjs"
Cohesion: 0.21
Nodes (20): Analysis, analyzeAttributes(), analyzeFragment(), analyzeNode(), analyzeSvelteMarkup(), applyReplacements(), classifyEachKey(), classifyRoots() (+12 more)

### Community 83 - "onboard.md"
Cohesion: 0.09
Nodes (22): Assess Onboarding Needs, Context Over Ceremony, Contextual Help, Design Onboarding Experiences, Documentation & Help, Empty State Design, Feature Discovery & Adoption, Guided Tours & Walkthroughs (+14 more)

### Community 84 - "checkQuality"
Cohesion: 0.10
Nodes (23): borderColorsFromStyle(), borderWidthsFromStyle(), checkElementGptBorderShadow(), checkElementGptBorderShadowDOM(), checkElementOversizedH1(), checkElementOversizedH1DOM(), checkElementQuality(), checkElementQualityDOM() (+15 more)

### Community 85 - "sveltekit-adapter.mjs"
Cohesion: 0.19
Nodes (20): firstExistingFile(), applySvelteKitLiveAdapter(), buildSvelteLiveRootComponent(), defaultSvelteLayout(), detectSvelteKitProject(), ensureSvelteLiveRootComponent(), escapeRegExp(), fileIncludes() (+12 more)

### Community 86 - "Extract Flow"
Cohesion: 0.13
Nodes (12): Before you finish, Scope is sovereign, The amplification, The skeleton test, Why it reads flat, Extract Flow, Step 1: Discover the Design System, Step 2: Identify Patterns (+4 more)

### Community 87 - "Operate mode depth (and Read notes)"
Cohesion: 0.10
Nodes (18): Craft floor, Refuse, Verify, Constraints, Failure modes, Flow, /impeccable hooks, Routing (+10 more)

### Community 88 - "The Toolkit"
Cohesion: 0.10
Nodes (20): Animate complex properties, Assess What "Extraordinary" Means Here, For data-heavy interfaces, For functional UI, For performance-critical UI, For visual/marketing surfaces, Implement with Discipline, Interact with the device (+12 more)

### Community 89 - "🛠️ 4. Phased Step-by-Step Execution Plan"
Cohesion: 0.08
Nodes (24): 🎯 1. Mission & Scope: What Changes vs. What Stays, 🎨 2. The Luxury Sanctuary Material System, 3.1 Sculpted Floating Sanctuary Dock (`components/Sidebar.tsx`), 3.2 Dashboard Sanctuary Overview (`components/DashboardView.tsx`), 3.3 Expense Management & Budget Gatekeeper (`app/dashboard/expenses/page.tsx`), 3.4 Profile & Media Management (`app/dashboard/profile/page.tsx`), 3.5 Supplementary Sanctuary Modules, 📐 3. Screen-by-Screen Ground-Up UI Blueprint (+16 more)

### Community 90 - "resolveLengthPx"
Cohesion: 0.13
Nodes (21): checkElementHeroEyebrow(), checkElementHeroEyebrowDOM(), checkHeroEyebrow(), checkKickerAboveHeading(), checkKickerAboveHeadingDOM(), checkKickerAboveHeadingFromDoc(), checkNumberedSectionLabels(), checkNumberedSectionLabelsDOM() (+13 more)

### Community 91 - "Design Audit"
Cohesion: 0.10
Nodes (19): Code Quality, Color and Surfaces, Component Patterns, Content, Design Audit, Fix Priority, How This Works, Iconography (+11 more)

### Community 92 - "generate-image.mjs"
Cohesion: 0.15
Nodes (16): arg(), crc32(), hash32(), hexRgb(), hslToRgb(), keyChroma(), palette(), plateId (+8 more)

### Community 93 - "runHook"
Cohesion: 0.17
Nodes (20): appendDesignSystemNote(), appendDesignSystemNoteOnce(), bumpEditCount(), commitFooterShown(), consumeSessionNoticeFlag(), dedupeAgainstCache(), depthIsSet(), ensureFile() (+12 more)

### Community 94 - "captureElementToBlob"
Cohesion: 0.14
Nodes (19): averageRgb01(), captureAndEmit(), captureElementFromRenderedAncestor(), captureElementToBlob(), compileShader(), cssColorToRgb01(), dominantRgb01(), findBackdropAncestor() (+11 more)

### Community 95 - "staleness.mjs"
Cohesion: 0.13
Nodes (28): DESIGN_SIDECAR_SCHEMA_VERSION, PRODUCT_DEPRECATED_SECTIONS, PRODUCT_SCHEMA_VERSION, PRODUCT_V4_SECTIONS, productStampLine(), readProductSchemaVersion(), readSidecarSchemaVersion(), stampProductSchema() (+20 more)

### Community 97 - "onAnnotDown"
Cohesion: 0.18
Nodes (19): applyPlaceholderDimensions(), beginEditPin(), buildAnnotationsForCapture(), buildPinElement(), cancelEditingPin(), finalizeEditingPin(), initAnnotOverlay(), localCoords() (+11 more)

### Community 98 - "renderGroupedTemplate"
Cohesion: 0.36
Nodes (10): clampGroupedToBudget(), clampLastLine(), clampToBudget(), directiveFooter(), footerFallbacks(), formatDedupedFindingLine(), formatFindingLine(), isFindingLine() (+2 more)

### Community 99 - "createLiveBrowserSessionState"
Cohesion: 0.21
Nodes (15): createLiveBrowserSessionState(), clearHandled(), clearScrollY(), clearSession(), isHandled(), loadSession(), markHandled(), nextCheckpointRevision() (+7 more)

### Community 100 - "pin.mjs"
Cohesion: 0.18
Nodes (16): CODEX_HARNESSES, commandPrefixForSkillsDir(), __dirname, findHarnessDirs(), findOpencodeCommandsDirs(), generatePinnedOpencodeCommand(), generatePinnedSkill(), HARNESS_DIRS (+8 more)

### Community 101 - "image-metrics.mjs"
Cohesion: 0.26
Nodes (15): inkBox(), paletteOf(), chromeStripCheck(), inkColor(), plateClipCheck(), ruleRows(), textRegionCheck(), colorHistogram() (+7 more)

### Community 102 - "tag-strategy.mjs"
Cohesion: 0.21
Nodes (16): appendOriginToDirective(), buildTagBlock(), commentClose(), commentOpen(), detectLineEnding(), findCspMetaTags(), getAttr(), insertTag() (+8 more)

### Community 103 - "animate.md"
Cohesion: 0.12
Nodes (14): Accessibility and control, Choose material by meaning, Find the job, Implement to the runtime, Set the motion thesis, Timing and easing, Verify, Visitor mode (+6 more)

### Community 104 - "Handle `generate`"
Cohesion: 0.12
Nodes (16): 1. Read the screenshot (if present), 2. Wrap the element, 3. Load the action's reference, 4. Plan three variants: identity first, then mode, then axes, 5. Apply the freeform prompt (if present), 6. Deliver variants, 7. Parameters (composition-sized, 0-4 per variant), 8. Signal done (+8 more)

### Community 105 - "checkHeadingRhythmDOM"
Cohesion: 0.18
Nodes (16): checkHeadingRhythmDOM(), clusterTop(), edgeAbove(), edgeBelow(), hasOwnTopBoundary(), insideSmallCard(), isVisibleFlow(), overlapsX() (+8 more)

### Community 106 - "createLiveBrowserDomHelpers"
Cohesion: 0.17
Nodes (10): createLiveBrowserDomHelpers(), cssId(), liveUiRoot(), makeFrozenAnchor(), own(), pickable(), rectIsUsableAnchor(), uiAppend() (+2 more)

### Community 107 - "tasteskill: Anti-Slop Frontend Skill"
Cohesion: 0.13
Nodes (15): 0.A Read these signals first, 0.B Output a one-line "Design Read" before generating, 0. BRIEF INFERENCE (Read the Room Before Anything Else), 0.C If the brief is ambiguous, ask one question, do not guess, 0.D Anti-Default Discipline, 13. OUT OF SCOPE, 14. FINAL PRE-FLIGHT CHECK, 1.A Dial Inference (design read → dial values) (+7 more)

### Community 108 - "Appendix B - Canonical Sources (read these before reinventing)"
Cohesion: 0.13
Nodes (15): Appendix B - Canonical Sources (read these before reinventing), Apple Liquid Glass (Apple platforms only), Atlassian, Bootstrap, Carbon, Fluent UI, GOV.UK, Material Web (+7 more)

### Community 109 - "Generate Report"
Cohesion: 0.13
Nodes (14): 1. Accessibility (A11y), 2. Performance, 3. Theming, 4. Responsive Design, 5. Implementation Integrity (CRITICAL), Audit Health Score, Detailed Findings by Severity, Diagnostic Scan (+6 more)

### Community 110 - "sampleCssBackground"
Cohesion: 0.20
Nodes (15): blendRgba(), clampByte(), firstCssUrl(), getLayerValue(), loadVisualContrastImage(), parseObjectPosition(), parsePositionPair(), parsePositionToken() (+7 more)

### Community 111 - "checkHeadingRhythmDOM"
Cohesion: 0.18
Nodes (16): checkHeadingRhythmDOM(), clusterTop(), edgeAbove(), edgeBelow(), hasOwnTopBoundary(), insideSmallCard(), isVisibleFlow(), overlapsX() (+8 more)

### Community 112 - "png.mjs"
Cohesion: 0.23
Nodes (14): CHANNELS, chunk(), crc32(), crcTable, decodePng(), encodePng(), isPng(), loadRaster() (+6 more)

### Community 113 - "New visual work"
Cohesion: 0.14
Nodes (14): 1. Decide what is already true, 2. Ask what will change the work, 3. Choose the right amount of invention, 4. Commit the world, 5. Record the decision, 6. Build with full commitment, 7. Inspect and finish, Both paths (+6 more)

### Community 114 - "optimize.md"
Cohesion: 0.14
Nodes (13): Animation Performance, Assess Performance Issues, Core Web Vitals Optimization, Cumulative Layout Shift (CLS < 0.1), Interaction to Next Paint (INP < 200ms), Largest Contentful Paint (LCP < 2.5s), Loading Performance, Network Optimization (+5 more)

### Community 115 - "parseAnyColor"
Cohesion: 0.07
Nodes (58): buildHtmlPatternCorpora(), checkColors(), checkElementAIPaletteDOM(), checkElementGlow(), checkElementGlowDOM(), checkGlow(), checkHtmlPatterns(), collectCssCustomProps() (+50 more)

### Community 116 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 117 - "embed-prompt.mjs"
Cohesion: 0.19
Nodes (12): args, buf, crc32(), crcTable, file, imageType(), parsePng(), pngChunk() (+4 more)

### Community 118 - "frameworks/index.mjs"
Cohesion: 0.17
Nodes (11): COMMENT_SYNTAXES, FRAMEWORKS, INJECT_KINDS, PREVIEW_MODES, SOURCE_TRAIT_DEFAULTS, STYLE_MODES, TAG_PATCH_KIND, nextjs (+3 more)

### Community 119 - "template-extensions.mjs"
Cohesion: 0.18
Nodes (14): IMPECCABLE_DIR, extensionCache, LIVE_TEMPLATE_EXTENSIONS, matchesTemplateExtension(), mergeExtensions(), normalizeExtensionEntries(), readLiveTemplateExtensions(), resolveLiveTemplateExtensions() (+6 more)

### Community 120 - "handlePollPost"
Cohesion: 0.16
Nodes (21): eventPriority(), selectAvailablePendingEvent(), acknowledgePendingEvent(), agentPollingConnected(), broadcast(), broadcastAgentPollingIfChanged(), cancelQueuedAnonymousExitEvents(), findAvailablePendingEvent() (+13 more)

### Community 121 - "checkElementDesignSystemDOM"
Cohesion: 0.15
Nodes (13): browserColorsClose(), browserDesignSystemConfig(), browserHasDirectText(), browserPrimaryFont(), browserRadiusTokens(), browserSampleText(), checkBrowserDesignSystemSources(), checkElementDesignSystemDOM() (+5 more)

### Community 122 - "appendSanitizedCssRule"
Cohesion: 0.24
Nodes (11): appendSanitizedCssRule(), bakeParamValuesInCss(), escapeRegExp(), formatCssRule(), parseCssRules(), rewriteAcceptedSvelteSelector(), rewriteAcceptedSvelteSelectorPart(), rewriteParamSelectors() (+3 more)

### Community 123 - "detect-utils.mjs"
Cohesion: 0.36
Nodes (10): astro, detectAstroProject(), fileExists(), findConfigFile(), hasAnyDependency(), literalConfigFiles(), readPackageDeps(), detectNextProject() (+2 more)

### Community 124 - "4. DESIGN ENGINEERING DIRECTIVES (Bias Correction)"
Cohesion: 0.17
Nodes (12): 4.10 Quotes & Testimonials, 4.11 Page Theme Lock (Light / Dark Mode Consistency), 4.1 Typography, 4.2 Color Calibration, 4.3 Layout Diversification, 4.4 Materiality, Shadows, Cards, 4.5 Interactive UI States, 4.6 Data & Form Patterns (+4 more)

### Community 125 - "critique.md"
Cohesion: 0.17
Nodes (11): Action Summary, Ask the User, Assessment A: Design Review, Assessment B: Detector + Browser Evidence, Assessment Orchestration, Deliver the Report, Hard Invariants, Persist the Snapshot (+3 more)

### Community 126 - "Simplify the Design"
Cohesion: 0.17
Nodes (11): Assess Current State, Code Simplification, Content Simplification, Document Removed Complexity, Information Architecture, Interaction Simplification, Layout Simplification, Plan Simplification (+3 more)

### Community 127 - "Hardening Dimensions"
Cohesion: 0.17
Nodes (11): Accessibility Resilience, Assess Hardening Needs, Edge Cases & Boundary Conditions, Error Handling, Hardening Dimensions, Input Validation & Sanitization, Internationalization (i18n), Performance Resilience (+3 more)

### Community 128 - "live.mjs"
Cohesion: 0.35
Nodes (10): livePathGlobToRegex(), __dirname, ensureServerRunning(), resolveFiles(), liveCli(), relOrNull(), runScript(), safeParse() (+2 more)

### Community 129 - "clarify.md"
Cohesion: 0.18
Nodes (10): Actions and navigation, Audit the language, Errors and permissions, Forms, Help and instructional text, Loading, empty, and success states, Rewrite by function, Set the message hierarchy (+2 more)

### Community 130 - "Nielsen's 10 Heuristics"
Cohesion: 0.18
Nodes (11): 10. Help and Documentation, 1. Visibility of System Status, 2. Match Between System and Real World, 3. User Control and Freedom, 4. Consistency and Standards, 5. Error Prevention, 6. Recognition Rather Than Recall, 7. Flexibility and Efficiency of Use (+3 more)

### Community 131 - "polish.md"
Cohesion: 0.18
Nodes (10): 1. Establish the system, 2. Gather the evidence, 3. Triage, 4. Polish the whole path, 5. Verify and finish, Color, imagery, and icons, Content and code, Flow and hierarchy (+2 more)

### Community 132 - "quieter.md"
Cohesion: 0.18
Nodes (10): Assess Current State, Color Refinement, Composition Refinement, Motion Reduction, Plan Refinement, Refine the Design, Simplification, Verify Quality (+2 more)

### Community 133 - "detect-csp.mjs"
Cohesion: 0.20
Nodes (10): detectCsp(), INLINE_HEADER_SIGNALS, LAYOUT_EXTS, MONOREPO_HELPER_SIGNALS, NUXT_ROUTE_RULES_SIGNALS, NUXT_SECURITY_SIGNALS, SCAN_EXTS, SKIP_DIRS (+2 more)

### Community 134 - "generation-preflight.mjs"
Cohesion: 0.35
Nodes (9): buildGenerationPreflight(), compactError(), execFileAsync, insertTarget(), normalizeTarget(), replaceTarget(), runGenerationPreflight(), sourceResolutionCache (+1 more)

### Community 135 - "palette.mjs"
Cohesion: 0.24
Nodes (7): args, buildWeights(), hashUnit(), pickSeed(), seed, SEEDS, weightedPick()

### Community 136 - "10. REFERENCE VOCABULARY (Pattern Names the Agent Should Know)"
Cohesion: 0.20
Nodes (10): 10. REFERENCE VOCABULARY (Pattern Names the Agent Should Know), Animation Library Choice, Cards & Containers, Galleries & Media, Hero Paradigms, Layout & Grids, Micro-Interactions & Effects, Navigation & Menus (+2 more)

### Community 137 - "ImageCropModal.tsx"
Cohesion: 0.31
Nodes (5): getInitials(), ProfilePage(), ImageCropModalProps, createImage(), getCroppedImg()

### Community 138 - "browser-script-parts.mjs"
Cohesion: 0.19
Nodes (10): assembleLiveBrowserScript(), assertLiveBrowserScriptParts(), LIVE_BROWSER_SCRIPT_PARTS, readLiveBrowserScriptParts(), resolveLiveBrowserScriptParts(), loadBrowserScripts(), LIVE_CHROME_MOUNT_CONTRACT, LIVE_UI_COMPONENT_IDS (+2 more)

### Community 139 - "Generate Combined Critique Report"
Cohesion: 0.20
Nodes (10): Design Health Score, Design Specificity Verdict, Generate Combined Critique Report, Minor Observations, Overall Impression, Persona Red Flags, Priority Issues, Questions to Consider (+2 more)

### Community 140 - "Init flow"
Cohesion: 0.20
Nodes (10): Completion gate, Init flow, Step 1: Load current state, Step 2: Explore the project, Step 3: Interview for product truth, Step 4: Write PRODUCT.md, Step 5: Record workflow defaults, Step 6: Wrap up or resume (+2 more)

### Community 141 - "staleness-notice.mjs"
Cohesion: 0.38
Nodes (9): appendStalenessDirective(), buildStalenessDirective(), cachePath(), filterFreshFindings(), pruneCache(), readCache(), readJson(), stalenessCheckDisabled() (+1 more)

### Community 142 - "doctor.mjs"
Cohesion: 0.11
Nodes (35): extractPlatform(), hasVisualImplementation(), loadContext(), applyFixes(), cli(), collect(), parseArgs(), readProjectRootPatterns() (+27 more)

### Community 143 - "inline-ignores.mjs"
Cohesion: 0.40
Nodes (9): addRules(), applyInlineIgnores(), getSet(), hasDirectives(), isInlineIgnored(), normalizeRule(), parseInlineIgnores(), parseRuleList() (+1 more)

### Community 144 - "21st"
Cohesion: 0.20
Nodes (9): enabled, headers, oauth, type, url, x-api-key, mcp, 21st (+1 more)

### Community 145 - "nuxt.mjs"
Cohesion: 0.27
Nodes (8): applyNuxtLiveAdapter(), buildNuxtPlugin(), detectNuxtProject(), nuxt, NUXT_PLUGIN_MARKER, NUXT_PLUGIN_NAME, removeNuxtLiveAdapter(), buildLiveScriptSrc()

### Community 146 - "Common Cognitive Load Violations"
Cohesion: 0.22
Nodes (9): 1. The Wall of Options, 2. The Memory Bridge, 3. The Hidden Navigation, 4. The Jargon Barrier, 5. The Visual Noise Floor, 6. The Inconsistent Pattern, 7. The Multi-Task Demand, 8. The Context Switch (+1 more)

### Community 147 - "iOS platform"
Cohesion: 0.22
Nodes (9): Color & materials, Components & controls, iOS platform, Layout & structure, Motion, The iOS slop test, Touch targets, Typography (+1 more)

### Community 148 - "Shape"
Cohesion: 0.22
Nodes (8): Cadence, Confirm and stop, Phase 1: Discovery interview, Phase 2: Resolve the design direction, Phase 3: Write the brief, Round 1: purpose, people, and outcome, Round 2: material, behavior, and boundaries, Shape

### Community 149 - "package.json"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 150 - "9. AI TELLS (Forbidden Patterns)"
Cohesion: 0.25
Nodes (8): 9.A Visual & CSS, 9. AI TELLS (Forbidden Patterns), 9.B Typography, 9.C Layout & Spacing, 9.D Content & Data ("Jane Doe" Effect), 9.E External Resources & Components, 9.F Production-Test Tells (banned outright), 9.G EM-DASH BAN (the single most-violated Tell)

### Community 151 - "Android platform"
Cohesion: 0.25
Nodes (8): Android platform, Color & theming, Components & motion, Layout & structure, The Android slop test, Touch targets, Typography, Verifying the build

### Community 152 - "Persona-Based Design Testing"
Cohesion: 0.25
Nodes (8): 1. Impatient Power User: "Alex", 2. Confused First-Timer: "Jordan", 3. Accessibility-Dependent User: "Sam", 4. Deliberate Stress Tester: "Riley", 5. Distracted Mobile User: "Casey", Persona-Based Design Testing, Project-Specific Personas, Selecting Personas

### Community 153 - "live-setup.md"
Cohesion: 0.25
Nodes (7): append-arrays, append-string, Config drift, Consent prompt (use this phrasing), CSP detection (first-time only), Troubleshooting, Write the config

### Community 154 - "applyDeferredSvelteComponentAccepts"
Cohesion: 0.32
Nodes (8): applyLegacyDeferredAcceptsOnStartup(), applyDeferredSvelteComponentAccepts(), bumpSvelteComponentPreviewRevision(), deferredAcceptsPath(), findSvelteComponentManifest(), readDeferredAccepts(), readManifest(), writeDeferredAccept()

### Community 155 - "app/layout.tsx"
Cohesion: 0.15
Nodes (6): metadata, plusJakartaSans, LenisProvider(), copy, techStack, Providers()

### Community 156 - "APPENDICES - Real Source-Backed Reference Material"
Cohesion: 0.29
Nodes (6): APPENDICES - Real Source-Backed Reference Material, Appendix A - Install Commands per Design System, Appendix C - Apple Liquid Glass: Honest Web Approximation, Safer web approximation skeleton, What is NOT official, What is official

### Community 157 - "11. REDESIGN PROTOCOL"
Cohesion: 0.29
Nodes (7): 11.A Detect the Mode (first action), 11.B Audit Before Touching, 11.C Preservation Rules, 11.D Modernisation Levers (priority order), 11.E Decision Tree: Targeted Evolution vs Full Redesign, 11.F What Never Changes Silently, 11. REDESIGN PROTOCOL

### Community 158 - "3. DEFAULT ARCHITECTURE & CONVENTIONS"
Cohesion: 0.29
Nodes (7): 3.A Stack, 3.B State, 3.C Icons, 3.D Emoji Policy, 3. DEFAULT ARCHITECTURE & CONVENTIONS, 3.E Responsiveness & Layout Mechanics, 3.F Dependency Verification (mandatory)

### Community 159 - "6. PERFORMANCE & ACCESSIBILITY GUARDRAILS"
Cohesion: 0.29
Nodes (7): 6.A Hardware Acceleration, 6.B Reduced Motion (mandatory), 6.C Dark Mode (mandatory for any consumer-facing page), 6.D Core Web Vitals Targets, 6.E DOM Cost, 6.F Z-Index Restraint, 6. PERFORMANCE & ACCESSIBILITY GUARDRAILS

### Community 160 - "Cognitive Load Assessment"
Cohesion: 0.29
Nodes (7): Cognitive Load Assessment, Cognitive Load Checklist, Extraneous Load: Bad Design, Germane Load: Learning Effort, Intrinsic Load: The Task Itself, The Working Memory Rule, Three Types of Cognitive Load

### Community 161 - "Impeccable Asset Producer"
Cohesion: 0.29
Nodes (6): Core Rule, Decision Comps, Impeccable Asset Producer, Input Contract, Output Contract, The job

### Community 162 - "Impeccable Finish Reviewer"
Cohesion: 0.29
Nodes (6): Checks, in order, Disposition, Impeccable Finish Reviewer, Input Contract, Output Contract, Verdict Pass

### Community 163 - "Impeccable Manual Edit Applier"
Cohesion: 0.29
Nodes (6): Checks, Entry Atomicity, Impeccable Manual Edit Applier, Input Contract, Output Contract, Workflow

### Community 164 - "hook.mjs"
Cohesion: 0.70
Nodes (4): isStopEvent(), main(), readStdin(), stdinIsStop()

### Community 165 - "live-browser-ignores.js"
Cohesion: 0.52
Nodes (6): globToRegex(), matchesScope(), normalizeIgnoreRule(), normalizeIgnoreValue(), pageCandidates(), resolveDetectIgnores()

### Community 166 - "Diagnostic Scan"
Cohesion: 0.33
Nodes (6): 1. Accessibility (VoiceOver / TalkBack), 2. Performance, 3. Appearance & Theming, 4. Platform Conformance (CRITICAL), 5. Adaptivity, Diagnostic Scan

### Community 167 - "12. THE BLOCK LIBRARY (Contract - Implementations Land Here Iteratively)"
Cohesion: 0.40
Nodes (5): 12.A File Location, 12.B Required Frontmatter, 12.C Required Body Sections, 12.D Block-Library Discipline, 12. THE BLOCK LIBRARY (Contract - Implementations Land Here Iteratively)

### Community 168 - "5. CONTEXT-AWARE PROACTIVITY"
Cohesion: 0.40
Nodes (5): 5.A Sticky-Stack - Canonical Skeleton, 5.B Horizontal-Pan - Canonical Skeleton, 5.C Scroll-Reveal Stagger - Canonical Skeleton (lighter alternative), 5. CONTEXT-AWARE PROACTIVITY, 5.D Forbidden Animation Patterns

### Community 169 - "8. DARK MODE PROTOCOL"
Cohesion: 0.40
Nodes (5): 8.A Token Strategy (pick one, stick to it), 8.B Do Not Prescribe Specific Colors Here, 8.C Default Mode, 8.D Test in Both Modes Before Finishing, 8. DARK MODE PROTOCOL

### Community 170 - "Impeccable Documenter"
Cohesion: 0.40
Nodes (4): Impeccable Documenter, Input Contract, Output Contract, Workflow

### Community 171 - "context.mjs"
Cohesion: 0.06
Nodes (64): appendAutonomyCounterDirective(), appendBuildPathDirective(), appendCompRoundOpenDirective(), appendDetectorFallback(), appendImageGenDirective(), appendImageToolsDirective(), appendSubagentAuthorizationDirective(), appendSurfaceBriefContext() (+56 more)

### Community 172 - "7. DIAL DEFINITIONS (Technical Reference)"
Cohesion: 0.50
Nodes (4): 7. DIAL DEFINITIONS (Technical Reference), DESIGN_VARIANCE (Level 1-10), MOTION_INTENSITY (Level 1-10), VISUAL_DENSITY (Level 1-10)

### Community 173 - "Heuristics Scoring Guide"
Cohesion: 0.50
Nodes (4): Heuristics Scoring Guide, Issue Severity (P0–P3), Reference Material, Score Summary

### Community 174 - "detect.mjs"
Cohesion: 0.50
Nodes (3): candidates, detectorPath, __dirname

### Community 175 - "checkElementRadialSpotlightDOM"
Cohesion: 0.67
Nodes (4): checkElementRadialSpotlight(), checkElementRadialSpotlightDOM(), elementGradientValue(), spotlightLabel()

### Community 176 - "Frontend Design"
Cohesion: 0.29
Nodes (6): Design principles, Frontend Design, Ground it in the subject, More on writing in design, Process: brainstorm, explore, plan, critique, build, critique again, Restraint and self-critique

### Community 182 - "extends"
Cohesion: 0.33
Nodes (5): extends, rules, @typescript-eslint/no-explicit-any, next/core-web-vitals, next/typescript

### Community 192 - "checkFlatTypeHierarchyFromDoc"
Cohesion: 0.22
Nodes (11): checkStaticPageTypography(), checkFlatTypeHierarchyFromDoc(), checkFlatTypeHierarchySamples(), checkPageTypography(), checkTypography(), dominantTypeRoleSize(), hasTextContent(), isRenderedTypeElement() (+3 more)

### Community 194 - "readProjectPatternGroups"
Cohesion: 0.27
Nodes (10): parseYamlFlowList(), projectRootsDiagnostic(), readImpeccableProjectRoots(), readJson(), readLernaWorkspaces(), readPackageWorkspaces(), readPnpmWorkspaces(), readProjectPatternGroups() (+2 more)

### Community 197 - "normalizeGitHubEvent"
Cohesion: 0.43
Nodes (7): applyPatchText(), envProjectDir(), looksLikeApplyPatch(), normalizeGitHubEvent(), normalizeGrokEvent(), normalizeHookEvent(), parseGitHubToolArgs()

### Community 207 - "live-complete.mjs"
Cohesion: 0.43
Nodes (6): FORBIDDEN, verifyAcceptedFile(), completeCli(), completeThroughServer(), parseArgs(), readServerInfo()

### Community 208 - "source-lock.mjs"
Cohesion: 0.50
Nodes (7): isLiveServerPidReachable(), clearStaleLock(), readLock(), releaseOwnLock(), sleepSync(), sourceLockPath(), withSourceLockSync()

### Community 212 - "Generate Report"
Cohesion: 0.29
Nodes (7): Audit Health Score, Detailed Findings by Severity, Executive Summary, Generate Report, Patterns & Systemic Issues, Platform Conformance Verdict, Positive Findings

### Community 213 - "Visualize: Direction Comps & Asset Production"
Cohesion: 0.33
Nodes (5): After approval: the comp becomes a spec, Generate three compositional options, One approval point, Plates and provenance, Visualize: Direction Comps & Asset Production

### Community 214 - "Adaptation Strategies"
Cohesion: 0.40
Nodes (5): Adaptation Strategies, Orientation & foldables, Phone → Tablet (iPad / large screens), Platform → platform (iOS ↔ Android), Web → native (porting a website or web app)

## Knowledge Gaps
- **956 isolated node(s):** `next/core-web-vitals`, `next/typescript`, `@typescript-eslint/no-explicit-any`, `HERE`, `STATE_PATH` (+951 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1114 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `loadContext()` connect `doctor.mjs` to `context-signals.mjs`, `context.mjs`, `hook-before-edit.mjs`, `critique-storage.mjs`, `live-server.mjs`, `hook-lib.mjs`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Why does `createManualApplyController()` connect `manual-apply.mjs` to `live-server.mjs`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **Why does `StaticElement` connect `StaticElement` to `css-cascade.mjs`, `detect-html.mjs`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **What connects `next/core-web-vitals`, `next/typescript`, `@typescript-eslint/no-explicit-any` to the rest of the system?**
  _956 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dbConnect` be split into smaller, more focused modules?**
  _Cohesion score 0.05380333951762523 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._