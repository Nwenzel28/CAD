/* ═══════════════════════════════════════════════════════
   ORANGINEERING — Module 01: Design for Manufacturing
   Content data file (module-01-data.js)
═══════════════════════════════════════════════════════ */

const MODULE_CONTENT = {
  number:      "01",
  title:       "Design for Manufacturing",
  difficulty:  "Intermediate",
  duration:    "~4 hrs",
  description: "Learn to design parts that can actually be built. Understand tolerancing, feature minimization, and how your CAD decisions translate directly to machine time, cost, and part quality.",
  topics:      ["GD&T Basics", "Tolerancing", "DFM Principles", "Material Selection", "Draft Angles", "Process Selection"],
  prevModule:  null,
  nextModule:  "02-iteration.html",

  sections: [

    /* ══════════════════════════════════════════════════
       SECTION 1 — What is DFM?
    ══════════════════════════════════════════════════ */
    {
      title: "What is Design for Manufacturing?",
      blocks: [
        {
          type: "text",
          content: [
            "Design for Manufacturing (DFM) is the practice of designing parts with the manufacturing process in mind from the very start — not as an afterthought when a quote comes back three times over budget. It's the difference between a part that looks correct in CAD and a part that can be made at reasonable cost, on schedule, and to the quality you actually need.",
            "Most intermediate CAD users have no problem modeling complex geometry. The harder skill is modeling geometry that a machinist, sheet metal shop, or 3D printer can reproduce accurately, efficiently, and repeatedly. Every feature you add to a model is a commitment of time, money, and potential error in the real world. DFM is the discipline of making those commitments intentionally."
          ]
        },
        {
          type: "callout",
          kind: "note",
          content: "DFM isn't about dumbing down your designs. It's about understanding the language of each manufacturing process well enough to communicate your design intent clearly — and to know when a clever geometric trick is going to cost you dearly."
        },
        {
          type: "text",
          content: [
            "The three core questions of DFM cut through most design problems quickly:",
            "<strong>1. Can it be made?</strong> — Is the geometry physically achievable with the chosen process? Are there features a tool can't reach, a mold can't eject, or a printer can't bridge?",
            "<strong>2. Can it be measured?</strong> — Every critical dimension needs a way to be verified after production. If you can't inspect it, you can't control it, and you can't guarantee function.",
            "<strong>3. Can it be made consistently?</strong> — A process that produces one good part in ten is not production-ready. Can your tolerances be held across a full batch without heroic effort from the operator?"
          ]
        },
        {
          type: "callout",
          kind: "example",
          content: "<strong>Real scenario:</strong> A robotics team designed a gearbox housing with a beautiful internal cavity for weight reduction. The cavity required a 5-axis toolpath, two custom tool lengths, and added 4 hours of machine time. The weight saved was 47 grams. A simple pocket with standard tooling would have saved 38 grams in 20 minutes. The 9-gram difference cost them $340 in machining. DFM is about catching that trade-off before you send the drawing."
        },
        {
          type: "image",
          caption: "DFM Decision Flow",
          hint: "Flowchart: Design intent → Process selection → Feasibility check (can it be made / measured / repeated?) → Revise or release"
        },
        {
          type: "challenge",
          difficulty: "beginner",
          title: "Identify the DFM Problem",
          prompt: "Look at the following part description and identify which of the three DFM questions it fails — and why.",
          context: "A bracket is designed with a 12mm deep pocket that is 2mm wide, with a tolerance of ±0.005mm on the pocket width. The pocket is located in the center of the part, surrounded by walls on all four sides.",
          tasks: [
            "Which of the three DFM questions does this design fail, and why?",
            "Name at least two specific manufacturing problems this feature would cause.",
            "Suggest one design change that would solve the problem without changing the part's function."
          ],
          hint: "Think about what tool would need to cut this pocket. What aspect ratio does a 2mm wide, 12mm deep slot represent? What happens to a cutting tool at that ratio?",
          answer: "The pocket fails <strong>Can it be made?</strong> on two counts. First, a 2mm end mill cutting 12mm deep represents a 6:1 depth-to-diameter ratio — well past the 3:1 limit where tool deflection becomes severe and the 4:1 limit where breakage is likely. Second, ±0.005mm is a grinding/lapping tolerance, not a milling tolerance. Standard CNC milling holds ±0.025–0.05mm on a good day. The fix: widen the pocket to at least 8–10mm (giving a workable ~1.5:1 ratio), and relax the tolerance to ±0.05mm unless there is a specific functional reason for the tighter value."
        }
      ]
    },

    /* ══════════════════════════════════════════════════
       SECTION 2 — Manufacturing Processes
    ══════════════════════════════════════════════════ */
    {
      title: "Understanding Manufacturing Processes",
      blocks: [
        {
          type: "text",
          content: [
            "Every manufacturing process is a set of trade-offs. Speed vs. precision. Complexity vs. cost. Setup time vs. run time. Before you model a single feature, you need to understand which process will produce your part — and design specifically for its constraints and strengths.",
            "The most expensive mistake you can make in DFM is designing for the wrong process. A part optimized for 3D printing that gets quoted for CNC machining will come back at 10x the expected cost. Process selection is not a downstream decision — it needs to happen before CAD."
          ]
        },
        {
          type: "keyterms",
          title: "Core Processes and Their Constraints",
          items: [
            {
              term: "CNC Machining",
              definition: "Material is removed by rotating tools moving along programmed paths. Requires line-of-sight tool access — features must be reachable from a defined machining direction. Cannot create truly enclosed internal voids. Excellent dimensional accuracy (±0.025mm typical). Best for metal structural parts, housings, and precision interfaces."
            },
            {
              term: "Laser Cutting + Bending",
              definition: "2D profiles are cut from flat sheet stock with a laser, then bent to shape on a press brake. All geometry is derived from a flat pattern. No internal features — every hole and slot must pass through the full material thickness. Bends must have minimum radii and flange lengths to be achievable."
            },
            {
              term: "FDM 3D Printing",
              definition: "Plastic is extruded layer-by-layer to build up a part. Parts are weakest perpendicular to layer lines (Z direction). Overhangs beyond 45-50 degrees need support material, which adds post-processing. Dimensional accuracy is typically ±0.2–0.4mm. Best for prototypes, jigs, and low-load structural parts."
            },
            {
              term: "Injection Molding",
              definition: "Molten plastic is injected into a steel mold under high pressure. Every vertical wall needs draft (typically 1–3 degrees) so the part can eject from the mold. Wall thickness must be uniform (typically 2–4mm) to prevent sink marks, warping, and voids. Very high startup cost (tooling) but very low per-part cost at volume."
            },
            {
              term: "Waterjet Cutting",
              definition: "A high-pressure water and abrasive stream cuts through material. No heat-affected zone (unlike laser). Can cut almost any material including titanium, stone, and composites. Produces a slightly tapered cut edge. Good for flat profiles where laser power is insufficient."
            }
          ]
        },
        {
          type: "callout",
          kind: "tip",
          content: "<strong>The prototype trap:</strong> It is standard practice to 3D print a first prototype to check fit and form. That is fine — but a print is not a mechanical test of a machined part. The failure modes are completely different. A printed bracket that survives a load test tells you almost nothing about whether a machined aluminum version will survive the same test."
        },
        {
          type: "text",
          content: [
            "Process selection also determines your tolerancing strategy. CNC machining can hold ±0.025mm on a good setup. Sheet metal bending typically holds ±0.5–1mm on bent features. FDM printing is typically ±0.2–0.5mm. Injection molding can be very precise on in-mold features but varies significantly with thermal shrink.",
            "When a part has mating features — like a shaft into a bearing bore, or a bolt pattern across two plates — the tolerance of each process involved must stack up correctly. This is called a <strong>tolerance stack-up analysis</strong>, covered in detail in Section 3."
          ]
        },
        {
          type: "challenge",
          difficulty: "intermediate",
          title: "Process Selection Decision",
          prompt: "You need to manufacture a motor mounting plate for a competition robot. The plate is roughly 150mm x 100mm with four mounting holes for the motor, two slots for tensioning adjustment, and three tapped holes for a chain guard. Annual quantity: 2–4 plates per season.",
          context: "The plate needs to be stiff (no flex under motor torque load), lightweight, and the mounting hole pattern needs to be accurate to ±0.3mm to align with a standard motor face. You have access to a laser cutter, a 3-axis CNC mill, and FDM printers.",
          tasks: [
            "Which manufacturing process would you choose for this part, and why?",
            "Which process would you rule out first, and what specific feature makes it unsuitable?",
            "What additional information would you want to know before finalizing your process choice?"
          ],
          hint: "Consider each feature individually. The tapped holes need accurate thread engagement — which process handles that best at this quantity? The slots for tensioning need to be accurate but also adjustable — does that change anything?",
          answer: "<strong>Best choice: Laser cutting + tapping.</strong> At 2–4 parts per season, the setup cost of CNC machining is hard to justify. Laser cutting gives accurate hole positions (easily ±0.2mm with a decent machine), clean slots for adjustment, and fast turnaround. The tapped holes can be tapped manually after cutting — the laser gives you accurate pilot holes.<br><br><strong>Rule out first: FDM printing.</strong> The stiffness requirement eliminates it. Even continuous-fiber composites struggle to match aluminum sheet stiffness, and the motor mounting stress concentrations would likely cause delamination over a season.<br><br><strong>Additional info needed:</strong> Material thickness (affects bend radii if any bending is needed), whether the ±0.3mm requirement is on hole position relative to each other (easy with laser) or relative to an external datum (harder), and whether any holes need countersinking (laser cannot do that — needs secondary ops)."
        }
      ]
    },

    /* ══════════════════════════════════════════════════
       SECTION 3 — Tolerancing Fundamentals
    ══════════════════════════════════════════════════ */
    {
      title: "Tolerancing Fundamentals",
      blocks: [
        {
          type: "text",
          content: [
            "A tolerance is the acceptable range of variation for a dimension. No manufacturing process is perfectly repeatable — every part produced will vary slightly from the nominal dimension. Tolerances define how much variation is acceptable before a part fails to function correctly.",
            "The key insight that separates engineering from drafting: tolerances are not just about precision. They are about function. The right tolerance is the loosest value that still allows the assembly to work correctly. Anything tighter costs money for no benefit."
          ]
        },
        {
          type: "keyterms",
          title: "Core Tolerance Terminology",
          items: [
            {
              term: "Nominal dimension",
              definition: "The target (ideal) value of a dimension. Written as the base number on a drawing, e.g. 25.00mm. The tolerance defines the acceptable deviation from this value."
            },
            {
              term: "Bilateral tolerance",
              definition: "Variation is allowed in both directions from nominal. Written as 25.00 ± 0.10mm — the part is acceptable anywhere from 24.90 to 25.10mm."
            },
            {
              term: "Unilateral tolerance",
              definition: "Variation is only allowed in one direction. Written as 25.00 +0.10 / 0.00mm. Used when a feature must not exceed (or must not fall below) a specific value."
            },
            {
              term: "Clearance fit",
              definition: "The shaft is always smaller than the hole — there is always a gap between them. Used for parts that must slide or rotate freely. Example: a shaft through a plain bearing."
            },
            {
              term: "Interference fit (press fit)",
              definition: "The shaft is always larger than the hole — it must be pressed or thermally assembled. Creates a strong joint without fasteners. Example: a bearing outer race pressed into a housing bore."
            },
            {
              term: "Transition fit",
              definition: "The fit may be either clearance or interference depending on where each part falls within its tolerance band. Used where parts need to be located precisely but also removable. Example: a dowel pin in a locating hole."
            },
            {
              term: "Tolerance stack-up",
              definition: "When multiple toleranced dimensions chain together, their worst-case deviations add up. A chain of five ±0.1mm tolerances has a worst-case stack of ±0.5mm. Stack-up analysis finds whether an assembly still works in the worst case."
            }
          ]
        },
        {
          type: "callout",
          kind: "warning",
          content: "<strong>The over-tolerancing trap:</strong> A common habit is specifying ±0.001 inch on everything because it looks precise. A tight tolerance on a machined part can increase cost by 3–5x. On a turned shaft diameter, going from ±0.005 inch to ±0.001 inch often means switching from a standard milling pass to a grinding operation. Tolerance to function, not to habit."
        },
        {
          type: "text",
          content: [
            "<strong>How to determine the right tolerance:</strong> Start with the assembly function. What is the minimum clearance the joint needs to operate without binding? What is the maximum gap before the joint becomes sloppy or misaligned? The difference between those two functional limits is your working tolerance budget. Divide it among the parts involved, accounting for the manufacturing capability of each process.",
            "For example: a hex shaft through a hub needs 0.1mm minimum clearance to install and 0.5mm maximum gap before the hub wobbles. That is a 0.4mm functional budget. Split between shaft diameter and bore diameter, each part gets ±0.1mm — easily achievable with standard CNC turning."
          ]
        },
        {
          type: "image",
          caption: "Fit Types: Clearance, Transition, Interference",
          hint: "Three diagrams side by side: shaft/hole cross-sections showing the gap (clearance), overlap zone (interference), and straddling zone (transition), each with example tolerance bands labeled"
        },
        {
          type: "challenge",
          difficulty: "intermediate",
          title: "Tolerance Stack-Up Analysis",
          prompt: "You are designing a two-part clamping assembly. A bolt passes through a clearance hole in Plate A, then threads into Plate B. The bolt must be centered within ±1.5mm of the true center of Plate B's threaded hole for the clamp to close correctly.",
          context: "Plate A's clearance hole is positioned at 50.00mm from its reference edge. Plate B's threaded hole is also positioned at 50.00mm from its reference edge. Both plates are laser cut to a positional tolerance of ±0.4mm on hole centers. The plates are aligned by butting their reference edges together — but there could be a seating gap of up to 0.3mm on each edge.",
          tasks: [
            "List every source of positional error between the bolt center and the threaded hole center.",
            "Calculate the worst-case total misalignment.",
            "Does the assembly meet the ±1.5mm requirement in the worst case?",
            "If the margin is uncomfortably thin, suggest one change to improve it."
          ],
          hint: "Draw a chain: bolt center → Plate A hole center → Plate A reference edge → seating gap → Plate B reference edge → Plate B hole center. Each link in this chain has a tolerance contribution.",
          answer: "Sources of error: (1) Plate A hole position: ±0.4mm, (2) Plate A edge seating: up to 0.3mm, (3) Plate B edge seating: up to 0.3mm, (4) Plate B hole position: ±0.4mm.<br><br>Worst-case stack: 0.4 + 0.3 + 0.3 + 0.4 = <strong>±1.4mm total</strong>. This is within the ±1.5mm requirement — but only by 0.1mm margin. That is dangerously close.<br><br>To improve margin: add a dowel pin or alignment feature between the two plates to eliminate the seating gap error (removes 0.6mm from the stack), or tighten the laser cut tolerance to ±0.2mm on those specific holes (removes 0.4mm). Either change brings the stack well within spec."
        }
      ]
    },

    /* ══════════════════════════════════════════════════
       SECTION 4 — GD&T Basics
    ══════════════════════════════════════════════════ */
    {
      title: "GD&T Basics",
      blocks: [
        {
          type: "text",
          content: [
            "Geometric Dimensioning and Tolerancing (GD&T) is a symbolic language for communicating not just the size of features, but their form, orientation, location, and runout. It is the international standard (ASME Y14.5 in the US, ISO 1101 internationally) used on virtually every professional manufacturing drawing.",
            "Standard ± tolerances only control the size of a dimension. They say nothing about whether a surface is flat, whether a hole is perpendicular to the face it is in, or whether a pattern of holes is correctly positioned relative to each other. GD&T controls all of these — precisely, unambiguously, and in a way that directly drives how a part is inspected."
          ]
        },
        {
          type: "callout",
          kind: "note",
          content: "GD&T is often taught as a complex symbol system to memorize. A more useful framing: GD&T is a way of defining <strong>what matters about this feature for it to function</strong>. Each symbol maps to a specific functional requirement. Learn the function first, then the symbol."
        },
        {
          type: "keyterms",
          title: "The Most Important GD&T Symbols",
          items: [
            {
              term: "Flatness",
              definition: "All points on a surface must lie within two parallel planes separated by the flatness tolerance value. Flatness is independent of any datum — it only controls the surface itself, not where it sits in space. Used on mating faces, gasket surfaces, and precision bases. Example: a flatness callout of 0.05mm means the highest and lowest points on the surface can be no more than 0.05mm apart."
            },
            {
              term: "Perpendicularity",
              definition: "A surface or axis must lie within a tolerance zone that is perpendicular to a specified datum. For a bore, this means the axis of the hole must stay within a cylinder of the given diameter that is perfectly perpendicular to the datum face. Critical for press fits (a tilted bore will jam), bearing seats, and any mating interface that needs to be square."
            },
            {
              term: "True Position",
              definition: "The center of a feature (hole, pin, slot) must fall within a cylindrical tolerance zone centered on the theoretically exact position relative to specified datums. True position is more efficient than ± coordinate tolerances — a ±0.1mm XY tolerance creates a square zone, but a 0.14mm diameter true position zone has the same worst-case diagonal while rejecting fewer good parts."
            },
            {
              term: "Circularity",
              definition: "At any cross-section, all points on the surface of a cylinder or cone must fall within two concentric circles separated by the tolerance value. Used on shafts, bearing journals, and any round feature where roundness affects function (vibration, seal performance, bearing life)."
            },
            {
              term: "Runout",
              definition: "When the part is rotated about its datum axis, surface points must not deviate more than the tolerance value. Circular runout measures at individual cross sections; total runout measures across the entire surface simultaneously. Critical for any rotating part — pulleys, gears, shafts, rollers."
            },
            {
              term: "Datum Reference Frame",
              definition: "A coordinate system defined by datum features (usually labeled A, B, C) from which all GD&T tolerances are measured. The datum scheme defines how the part is held during machining and inspection — and ideally matches how it is constrained in the final assembly. Choosing the wrong datums is one of the most common GD&T mistakes."
            }
          ]
        },
        {
          type: "text",
          content: "A GD&T <strong>Feature Control Frame</strong> is the box on a drawing that communicates all of this. Reading left to right, it contains: the geometric characteristic symbol, the tolerance value (sometimes with a diameter symbol for cylindrical zones), and the datum references in priority order."
        },
        {
          type: "image",
          caption: "GD&T Feature Control Frame Anatomy",
          hint: "Labeled diagram: box divided into compartments showing [geometric symbol | tolerance value | datum A | datum B] with callout lines explaining each compartment's role"
        },
        {
          type: "callout",
          kind: "tip",
          content: "Start here: get fluent with flatness, perpendicularity, and true position. Those three symbols cover the majority of real-world mechanical drawings. Once those are second nature, add circularity and runout for rotating components."
        },
        {
          type: "challenge",
          difficulty: "intermediate",
          title: "Reading and Applying GD&T",
          prompt: "A machined aluminum plate has a critical bore that receives a bearing. The bore is 25mm in diameter. The engineering requirement is that the bearing must sit squarely in the bore — if the bore axis tilts more than 0.5mm over its 20mm depth relative to the top face of the plate, the bearing will bind.",
          context: "The top face of the plate (Datum A) has already been machined and is considered the reference surface. The bore is machined in a second operation.",
          tasks: [
            "Which GD&T symbol controls whether the bore axis is square to Datum A?",
            "Calculate the correct tolerance value to express the 0.5mm / 20mm depth requirement as a GD&T callout.",
            "Write out how this would appear in a feature control frame (in plain words, e.g. 'perpendicularity, cylindrical zone 0.X mm, relative to Datum A').",
            "Why is a cylindrical tolerance zone better here than a simple ±0.25mm positional tolerance?"
          ],
          hint: "If the bore can tilt at most 0.5mm over 20mm depth, what does that mean for the deviation of the bore axis at any point within those 20mm? The GD&T zone for an axis is cylindrical — the axis must stay inside a cylinder of diameter equal to the tolerance.",
          answer: "<strong>Symbol: Perpendicularity.</strong><br><br>If the bore can tilt at most 0.5mm over 20mm, the axis can deviate at most 0.5mm from true perpendicular across its full depth. The cylindrical tolerance zone must therefore be <strong>0.5mm diameter</strong> (the axis must stay within a 0.5mm diameter cylinder perpendicular to Datum A).<br><br><strong>Feature control frame:</strong> Perpendicularity | diameter 0.5mm | datum A.<br><br><strong>Why cylindrical zone:</strong> A ±0.25mm positional tolerance in X and Y creates a square zone — the axis could actually deviate up to 0.354mm diagonally (the square's diagonal) while still passing inspection. A cylindrical zone is perfectly round and represents the actual functional constraint uniformly in all directions. It rejects the same bad parts while accepting more good parts."
        }
      ]
    },

    /* ══════════════════════════════════════════════════
       SECTION 5 — Material Selection
    ══════════════════════════════════════════════════ */
    {
      title: "Material Selection",
      blocks: [
        {
          type: "text",
          content: [
            "Material selection and DFM are inseparable. The same geometry that is trivial to manufacture in 6061 aluminum might be nearly impossible in 4140 steel — not because of the geometry itself, but because harder materials require slower feed rates, more tool changes, and more careful fixturing. Material choice determines what processes are available, what tolerances are achievable, and ultimately what the part costs.",
            "Beyond manufacturability, material selection is an engineering decision that requires understanding the actual loads and environment the part will see. Under-specifying a material risks failure. Over-specifying it wastes weight and money. The goal is the minimum material that reliably meets the functional requirements."
          ]
        },
        {
          type: "keyterms",
          title: "Common Engineering Materials for Robotics and Prototyping",
          items: [
            {
              term: "6061-T6 Aluminum",
              definition: "The default structural material for machined robotics parts. Yield strength ~276 MPa, density 2.7 g/cm³. Machines quickly and cleanly. Anodizes well for corrosion protection and aesthetics. Weaker at heat-affected zones — if welding is required, use 5052 or 6063 instead. The T6 designation means it has been solution heat-treated and artificially aged to maximum hardness."
            },
            {
              term: "5052-H32 Aluminum",
              definition: "The preferred alloy for sheet metal work. Better formability than 6061 — bends without cracking at tighter radii. Lower yield strength (~193 MPa) but adequate for most brackets and panels. Excellent corrosion resistance. Harder to machine than 6061 due to its tendency to gall on tooling."
            },
            {
              term: "4130 / 4140 Chromoly Steel",
              definition: "High-strength alloy steels. 4130 yield strength ~435 MPa (normalized), 4140 even higher. Used where aluminum simply is not strong enough — shafts under high torque, gussets at high-stress joints, critical fasteners. Significantly heavier (7.85 g/cm³) and slower to machine. 4130 is more weldable; 4140 is typically used where maximum hardness is needed."
            },
            {
              term: "PLA / PETG (FDM Plastics)",
              definition: "PLA: stiff, easy to print, poor temperature resistance (softens above 60°C), brittle under impact. PETG: tougher, better temperature resistance (~80°C), slightly flexible. Both are useful for brackets, covers, and non-structural prototypes. Neither is appropriate for high-load structural applications — layer adhesion is the weak point."
            },
            {
              term: "Delrin / Acetal POM",
              definition: "A machinable engineering plastic. Low friction, dimensionally stable, self-lubricating. Excellent for bushings, wear pads, chain guides, and any sliding interface where you want to protect a metal mating surface. Machines easily and holds tight tolerances. Not suitable for high-load structural parts but outstanding in wear and friction applications."
            },
            {
              term: "Carbon Fiber (CFRP)",
              definition: "Exceptional stiffness-to-weight ratio. Highly anisotropic — very strong along fiber direction, weaker perpendicular. Difficult to machine without specialized tooling. Joining is tricky — standard fasteners can cause delamination at holes. Worth considering for long spans (arms, beams) where stiffness-to-weight is the critical property."
            }
          ]
        },
        {
          type: "callout",
          kind: "warning",
          content: "<strong>The steel default trap:</strong> Engineers who are unsure often default to steel. It feels safe. But on a mobile robot, every gram of unnecessary structural mass is a gram that cannot be payload, battery, or electronics. Before using steel, ask: what specific property of steel is required here that 6061 aluminum cannot provide? If you cannot answer that question, use aluminum."
        },
        {
          type: "text",
          content: [
            "A useful shortcut for comparing structural materials is <strong>specific strength</strong> (yield strength divided by density). 6061-T6 aluminum: ~102 kNm/kg. 4130 steel: ~55 kNm/kg. For the same structural performance, an aluminum part weighs roughly half as much as a steel one.",
            "That said, stiffness (modulus of elasticity) is a different story. Steel's modulus (~200 GPa) is about 3x aluminum's (~69 GPa). If deflection under load — not strength — is the limiting factor, a steel part can be made thinner while maintaining the same stiffness, potentially closing the weight gap. See the challenge problem below for a worked example of exactly this trade-off."
          ]
        },
        {
          type: "checklist",
          title: "Material Selection Checklist",
          items: [
            { type: "do",   text: "Define your load case (magnitude, direction, impact vs. static) before picking a material" },
            { type: "do",   text: "Check whether strength or stiffness is the binding constraint — they may point to different materials" },
            { type: "do",   text: "Verify that your chosen material is available in the stock form (sheet, bar, tube) you need" },
            { type: "do",   text: "Consider the full manufacturing chain — will this material respond well to your chosen process?" },
            { type: "do",   text: "Account for environment — will the part see heat, corrosion, UV, or chemical exposure?" },
            { type: "dont", text: "Don't use steel when aluminum meets the strength requirement — you are adding weight for no reason" },
            { type: "dont", text: "Don't assume a 3D-printed part has equivalent strength to a machined one from the same base material" },
            { type: "dont", text: "Don't pick a material based solely on what you are most comfortable modeling in CAD" },
            { type: "dont", text: "Don't ignore fastener compatibility — dissimilar metals in contact cause galvanic corrosion" }
          ]
        },
        {
          type: "challenge",
          difficulty: "advanced",
          title: "Material Trade-Off Analysis",
          prompt: "You are designing a 400mm-long horizontal arm for a robot. The arm extends from a pivot at one end and carries a 2kg payload at the other. It must not deflect more than 3mm at the tip under the payload load. Choose between 6061-T6 aluminum and 4130 steel for a solid square cross-section.",
          context: "For a cantilever beam: tip deflection = (F x L³) / (3 x E x I), where F is force, L is length, E is elastic modulus, and I is the second moment of area. For a square cross-section, I = h⁴ / 12. E_aluminum = 69 GPa, E_steel = 200 GPa. Density_aluminum = 2.7 g/cm³, density_steel = 7.85 g/cm³.",
          tasks: [
            "For each material, solve for the minimum square cross-section side length h that keeps tip deflection at or below 3mm.",
            "Calculate the mass of the 400mm arm for each solution.",
            "Which material results in a lighter arm, and by how much?",
            "What does this result tell you about the general case for aluminum vs. steel on stiffness-limited beams?"
          ],
          hint: "Rearrange the deflection formula to solve for I, then solve for h from I = h⁴/12. F = 2 x 9.81 = 19.62 N. L = 0.4 m. Keep units consistent in SI (Newtons, meters, Pascals), then convert h to mm for the final answer. Volume of the arm = h² x L.",
          answer: "F = 19.62 N, L = 0.4 m, delta_max = 0.003 m.<br><br>Required I = (F x L³) / (3 x E x delta) = (19.62 x 0.064) / (3 x E x 0.003) = 1.2557 / (0.009 x E).<br><br><strong>Aluminum:</strong> I = 1.2557 / (0.009 x 69x10⁹) = 2.02x10⁻⁹ m⁴. h⁴ = 12 x 2.02x10⁻⁹ = 2.424x10⁻⁸. h = 0.01305 m = <strong>13.05mm</strong>. Mass = 0.01305² x 0.4 x 2700 = <strong>185g</strong>.<br><br><strong>Steel:</strong> I = 1.2557 / (0.009 x 200x10⁹) = 6.98x10⁻¹⁰ m⁴. h⁴ = 12 x 6.98x10⁻¹⁰ = 8.376x10⁻⁹. h = 0.01095 m = <strong>10.95mm</strong>. Mass = 0.01095² x 0.4 x 7850 = <strong>378g</strong>.<br><br><strong>Aluminum is roughly 2x lighter</strong> for the same stiffness, despite needing a larger cross-section. This generalizes: for stiffness-limited beams in bending, aluminum almost always wins on mass over steel because its lower density more than compensates for its lower modulus."
        }
      ]
    },

    /* ══════════════════════════════════════════════════
       SECTION 6 — DFM Rules by Process
    ══════════════════════════════════════════════════ */
    {
      title: "DFM in Practice: Rules by Process",
      blocks: [
        {
          type: "text",
          content: [
            "Abstract principles are useful, but DFM is most powerful when you have internalized a concrete set of rules for each process. The rules below are not arbitrary — each one traces directly to a physical constraint of the process. Understanding the why behind each rule lets you know when it is safe to bend it, and when it is not.",
            "Think of these as a mental checklist you run through every time you model a feature. The goal is that DFM decisions happen in CAD, not in a shop conversation after the drawing has already been sent."
          ]
        },
        {
          type: "steps",
          title: "DFM Rules for CNC Machining",
          items: [
            {
              heading: "Design inside corners to standard end mill radii",
              detail: "Inside pocket corners cannot be square — every end mill has a radius. Standard sizes are 1/16\", 1/8\", 3/16\", 1/4\", 3/8\". Design your corners to match the largest end mill that fits your feature. An odd radius forces either a custom tool or an interpolated toolpath — both add cost. If you need a near-square corner, add a relief slot at the corner rather than specifying a tiny radius."
            },
            {
              heading: "Keep pocket depth-to-width ratio under 4:1",
              detail: "Tool deflection increases dramatically with depth. A 6mm end mill cutting a 6mm wide pocket at 24mm depth (4:1) is already at its limit. Beyond that, expect chatter, poor surface finish, and risk of tool breakage. If you need a deep narrow feature, design it as a slot open on one side, or increase the pocket width to bring the ratio down."
            },
            {
              heading: "Consolidate features to minimize setups",
              detail: "Every time the machinist re-fixtures the part, setup time adds cost and introduces potential for datum shift between features. Ideally, all features on a face are machined in one setup. If features on multiple faces are needed, group them so only one re-fixture is required. Ask: could this feature be oriented differently without affecting function?"
            },
            {
              heading: "Use chamfers on external edges instead of fillets",
              detail: "A 45-degree chamfer on an external edge is a single pass with a chamfering tool. A fillet requires a ball-end mill pass with multiple depth increments to achieve a smooth radius. Unless the fillet is there for structural reasons (stress relief at a high-load feature), use a chamfer — it is faster, cheaper, and reduces stress concentrations on external edges."
            },
            {
              heading: "Specify only the surface finish you actually need",
              detail: "Surface finish requirements directly drive machining time. Ra 3.2 micrometers is standard and fast. Ra 0.8 micrometers requires extra passes. Ra 0.2 micrometers often requires grinding. Only call out tight surface finishes where there is a functional reason — sealing surfaces, bearing bores, precision sliding interfaces."
            }
          ]
        },
        {
          type: "steps",
          title: "DFM Rules for Laser Cut Sheet Metal",
          items: [
            {
              heading: "Minimum inside bend radius equals material thickness",
              detail: "When sheet metal bends, the outer face stretches and the inner face compresses. Bending tighter than the material thickness causes cracking on the outer face. For 90-degree bends in 3mm 6061 aluminum, minimum inside bend radius is 3mm. For 5052 aluminum (more formable), you can go slightly tighter. Stainless and hard alloys require larger minimum radii."
            },
            {
              heading: "Keep holes at least 2x material thickness from any edge or bend",
              detail: "Holes too close to edges create thin webs that deform or tear during laser cutting or punching. Holes too close to bends distort during bending as the material flows. For 3mm material, keep all holes at least 6mm from any edge and at least 6mm from any bend line (measured to hole edge, not center)."
            },
            {
              heading: "Add bend relief notches at intersecting bends",
              detail: "Where two bend lines meet at a corner (common in box-form parts), add a small relief cut at the intersection point. Without it, the material tears unpredictably during bending. Relief cuts should be at least 1x material thickness wide and 1x material thickness long, positioned at the exact bend line intersection."
            },
            {
              heading: "Use tab-and-slot joints for assembly alignment",
              detail: "Laser-cut tabs that slot precisely into matching laser-cut holes eliminate the need for external fixtures during welding or riveting. The kerf of a laser cut is consistent and repeatable — you can design tabs that are a light press fit for precise self-location. This technique is widely used in production sheet metal assemblies."
            }
          ]
        },
        {
          type: "callout",
          kind: "example",
          content: "<strong>Real DFM review outcome:</strong> During a pre-release review of an arm bracket, a team found four issues: inside pocket radii were 2.3mm (no standard end mill matches this), one pocket was at a 5:1 depth-to-width ratio, two holes were 4mm from a bend line on 3mm material, and all tolerances were ±0.001 inch. After fixing each issue and relaxing tolerances to ±0.005 inch, the revised fabrication quote came back 40% lower. No functional change."
        },
        {
          type: "checklist",
          title: "Pre-Release DFM Review Checklist",
          items: [
            { type: "do", text: "All inside corner radii match standard end mill sizes" },
            { type: "do", text: "Pocket depth-to-width ratio is 4:1 or less on all pockets" },
            { type: "do", text: "Part can be machined in the minimum number of setups" },
            { type: "do", text: "Tolerances are the loosest values that still allow the assembly to function" },
            { type: "do", text: "Drawing has a datum scheme that matches how the part will be fixtured" },
            { type: "do", text: "Material, temper/alloy, and surface finish are explicitly called out" },
            { type: "do", text: "Sheet metal holes are at least 2x material thickness from all edges and bend lines" },
            { type: "do", text: "Bend radii are at least equal to material thickness for all bends" },
            { type: "dont", text: "No tolerances tighter than ±0.025mm without a documented functional reason" },
            { type: "dont", text: "No deep narrow pockets with depth greater than 4x width" },
            { type: "dont", text: "No surface finish callouts tighter than Ra 1.6 micrometers without a specific sealing or wear reason" }
          ]
        },
        {
          type: "challenge",
          difficulty: "advanced",
          title: "Full DFM Review",
          prompt: "You have been handed the following part description to review before it goes to the machine shop. Identify every DFM problem, explain the specific manufacturing issue each one causes, and propose a fix for each.",
          context: "The part is a 6061-T6 aluminum motor mount plate, 200mm x 150mm x 15mm thick, CNC machined. Features: four M5 mounting holes positioned to ±0.002 inch tolerance; two 8mm wide x 40mm deep lightening pockets on the underside; all inside pocket corners have 1mm radius; three 3mm diameter ventilation holes each 2mm from the nearest edge; a 60mm diameter through-bore for the motor shaft toleranced to ±0.0005 inch; a 5mm wide x 25mm deep slot open on one end; overall surface finish callout of Ra 0.4 micrometers on all surfaces.",
          tasks: [
            "List every DFM problem you can find. Aim for at least five.",
            "For each problem, explain what specific manufacturing difficulty it causes.",
            "Propose a specific fix for each issue."
          ],
          hint: "Go feature by feature. Check each one against the rules covered in this module: pocket depth-to-width ratio, corner radii vs. standard tool sizes, hole-to-edge distance, tolerance vs. process capability, and surface finish vs. functional need.",
          answer: "<strong>Problems found:</strong><br><br><strong>1. Lightening pocket aspect ratio:</strong> 8mm wide x 40mm deep = 5:1. Causes tool deflection, chatter, poor finish, and risk of tool breakage. Fix: widen pockets to at least 12mm (ratio drops to 3.3:1) or reduce depth to 32mm (4:1 at 8mm wide).<br><br><strong>2. 1mm inside corner radius:</strong> Requires a 2mm diameter end mill — fragile, slow, and expensive. Fix: increase to 3/16 inch (4.76mm) — the smallest practical end mill size that holds up reliably.<br><br><strong>3. 3mm holes 2mm from edge:</strong> Minimum edge distance should be 2x hole diameter = 6mm. At 2mm, the thin web will deform or breakthrough during drilling. Fix: move holes to at least 6mm from any edge.<br><br><strong>4. M5 holes to ±0.002 inch (0.05mm):</strong> Achievable but tight — requires careful fixturing and 100% inspection. If these are clearance holes for bolts into a standard motor pattern, ±0.1mm is almost certainly sufficient. Fix: confirm the functional requirement and relax to ±0.1mm unless there is a specific reason not to.<br><br><strong>5. 60mm bore to ±0.0005 inch (0.013mm):</strong> This is a precision grinding tolerance. Standard CNC boring holds ±0.025mm. Achieving ±0.013mm requires a dedicated grinding or honing operation, significantly increasing cost. Fix: if this bore accepts a standard bearing press fit, ±0.013mm may be justified. If it is a clearance fit for a motor shaft, ±0.05mm is sufficient and far cheaper.<br><br><strong>6. Ra 0.4 micrometers on all surfaces:</strong> Requires careful finishing passes on every surface — unnecessary on structural faces. Fix: apply Ra 0.4 only to the motor bore and any sealing faces. Specify Ra 3.2 for all other surfaces."
        }
      ]
    }

  ] // end sections
};

// Hand off to the renderer
document.addEventListener('DOMContentLoaded', () => renderModulePage(MODULE_CONTENT));