/* ═══════════════════════════════════════════════════════
   ORANGINEERING — Module 01: Design for Manufacturing
   Content data file (module-01-data.js)

   To edit content: change the blocks inside each section.
   To add a section: push a new object into the sections array.
   Block type reference is in module-renderer.js.
═══════════════════════════════════════════════════════ */

const MODULE_CONTENT = {
  number:      "01",
  title:       "Design for Manufacturing",
  difficulty:  "Intermediate",
  duration:    "~3 hrs",
  description: "Learn to design parts that can actually be built. Understand tolerancing, feature minimization, and how your CAD decisions translate directly to machine time, cost, and part quality.",
  topics:      ["GD&T Basics", "Tolerancing", "DFM Principles", "Material Selection", "Draft Angles"],
  prevModule:  null,
  nextModule:  "02-iteration.html",

  sections: [

    /* ── SECTION 1 ──────────────────────────────────── */
     {
        title: "Why DFM Matters (Mindset Shift)",
        blocks: [

          {
            type: "text",
            content: [
              "Most CAD users learn how to create geometry. Far fewer learn how to create geometry that can actually be manufactured. This gap is where real-world engineering problems begin.",
              "Design for Manufacturing (DFM) is the practice of thinking about how a part will be made while you are designing it — not after you're done. It connects your CAD decisions directly to cost, time, and part quality."
            ]
          },

          {
            type: "callout",
            kind: "warning",
            content: "If you design first and think about manufacturing later, you will almost always need to redesign the part — usually when time is limited."
          },

          {
            type: "text",
            content: [
              "CAD software gives you a powerful but misleading ability: you can design almost anything. But manufacturing is constrained by real tools, real materials, and real costs.",
              "Good engineering is not about designing the most complex part — it's about designing the simplest part that achieves the required function."
            ]
          },

          {
            type: "image",
            caption: "Over-Designed vs Manufacturing-Efficient Part",
            hint: "Left: complex part with many small features, deep pockets, and tight corners. Right: simplified version with fewer features and larger radii"
          },

          {
            type: "text",
            content: [
              "Even if two parts perform the exact same function, their cost can vary dramatically depending on how they are designed. The difference comes from how difficult they are to manufacture.",
              "To understand DFM, you need to understand where cost actually comes from."
            ]
          },

          {
            type: "keyterms",
            title: "Primary Manufacturing Cost Drivers",
            items: [
              {
                term: "Setup Time",
                definition: "Time required to prepare the machine, fixture the part, and align everything. Each setup adds significant cost."
              },
              {
                term: "Machining Time",
                definition: "Time spent actively cutting material. More features and deeper cuts increase this dramatically."
              },
              {
                term: "Tool Changes",
                definition: "Switching between tools during machining. More features usually require more tools."
              },
              {
                term: "Tolerance Requirements",
                definition: "Tighter tolerances require slower machining, better tools, and more inspection — increasing cost."
              }
            ]
          },

          {
            type: "callout",
            kind: "note",
            content: "Material cost is often NOT the main driver. Machining time and setup usually dominate."
          },

          {
            type: "text",
            content: [
              "Every feature you add to a part has a cost. A hole requires drilling. A pocket requires milling. A fillet may require a different tool. These operations add up quickly.",
              "This leads to one of the most important ideas in DFM: every feature must justify its existence."
            ]
          },

          {
            type: "steps",
            title: "How Features Translate to Cost",
            items: [
              {
                heading: "More features → more toolpaths",
                detail: "Each feature requires the machine to perform additional operations, increasing machining time."
              },
              {
                heading: "More setups → more time",
                detail: "If a part must be repositioned to access different features, setup time increases significantly."
              },
              {
                heading: "Complex geometry → slower machining",
                detail: "Tight corners, deep pockets, and small details require slower, more careful cutting."
              },
              {
                heading: "Tighter tolerances → higher precision work",
                detail: "The machine must move more slowly and parts must be inspected more carefully."
              }
            ]
          },

          {
            type: "image",
            caption: "Deep Pocket vs Open Geometry",
            hint: "Comparison showing a deep narrow pocket requiring long tool vs a wide shallow pocket that is easy to machine"
          },

          {
            type: "text",
            content: [
              "Manufacturing is also limited by the physical tools used to make parts. These tools have shape and size constraints that directly affect what geometry is possible.",
              "For example, most machining is done with rotating tools that are cylindrical. This creates natural limitations in the shapes they can produce."
            ]
          },

          {
            type: "keyterms",
            title: "Tool Constraints",
            items: [
              {
                term: "Tool Diameter",
                definition: "Limits how small internal features can be. Smaller tools are weaker and slower."
              },
              {
                term: "Tool Length",
                definition: "Longer tools can reach deeper features but are less stable and more prone to vibration."
              },
              {
                term: "Tool Shape",
                definition: "Most tools are round, meaning internal corners will always have a radius unless special processes are used."
              }
            ]
          },

          {
            type: "callout",
            kind: "warning",
            content: "Perfectly sharp internal corners are not possible with standard machining tools."
          },

          {
            type: "image",
            caption: "Internal Corner Limitation",
            hint: "Diagram showing a round cutting tool leaving a filleted internal corner instead of a sharp 90° edge"
          },

          {
            type: "text",
            content: [
              "At this point, the way you evaluate your designs should start to change. Instead of asking 'Can I model this?', you should be asking a different set of questions."
            ]
          },

          {
            type: "steps",
            title: "The DFM Mindset",
            items: [
              {
                heading: "Can a tool reach this feature?",
                detail: "If a tool cannot physically access the geometry, it cannot be manufactured without special processes."
              },
              {
                heading: "How many setups are required?",
                detail: "Each additional setup increases cost and introduces potential alignment errors."
              },
              {
                heading: "Does this feature improve function?",
                detail: "If not, it is likely unnecessary and should be removed."
              }
            ]
          },

          {
            type: "callout",
            kind: "tip",
            content: "A strong design is one where every feature has a clear purpose tied to function."
          },

          {
            type: "text",
            content: [
              "Many beginner designs include extra features that look good in CAD but provide no functional benefit. These features increase cost, machining time, and complexity without improving performance.",
              "Learning to remove unnecessary features is just as important as learning to create them."
            ]
          },

          {
            type: "image",
            caption: "Unnecessary vs Functional Features",
            hint: "Highlighted CAD model showing decorative fillets and extra holes vs a cleaned-up version with only functional elements"
          },

          {
            type: "text",
            content: [
              "Ultimately, DFM is about efficiency. The best designs achieve their goal with the least complexity, the fewest operations, and the lowest cost.",
              "This doesn't mean oversimplifying — it means making intentional decisions about every aspect of your design."
            ]
          },

          {
            type: "callout",
            kind: "example",
            content: "A part with 10 features is not inherently better than a part with 4. If both perform the same function, the simpler part will almost always be faster, cheaper, and more reliable to produce."
          },

          {
            type: "checklist",
            title: "Section 1 Takeaways",
            items: [
              { type: "do", text: "Think about manufacturing while designing, not after" },
              { type: "do", text: "Minimize unnecessary features" },
              { type: "do", text: "Consider tool limitations and access" },
              { type: "do", text: "Reduce setups whenever possible" },
              { type: "dont", text: "Don't assume CAD geometry can always be manufactured" },
              { type: "dont", text: "Don't add features without a functional reason" }
            ]
          }

        ]
      },

    /* ── SECTION 2 ──────────────────────────────────── */
    {
      title: "Understanding Manufacturing Processes",
      blocks: [
        {
          type: "text",
          content: "Every manufacturing process has a unique set of capabilities and constraints. A feature that is trivial to 3D print might be impossible to machine, and vice versa. Before you finalize any design, you need to know which process will be used — and design specifically for it."
        },
        {
          type: "keyterms",
          title: "Key Processes & Their Constraints",
          items: [
            {
              term: "CNC Machining",
              definition: "Material is removed by a rotating tool. Requires tool access from above (or with 5-axis, from multiple angles). Can't create internal cavities without EDM or specialized tooling. Excellent dimensional accuracy."
            },
            {
              term: "Laser Cutting / Sheet Metal",
              definition: "2D profiles cut from flat stock, then bent. Design is constrained to achievable bend radii and minimum flange lengths. No internal features — all geometry must be accessible from the cut face."
            },
            {
              term: "FDM 3D Printing",
              definition: "Material deposited layer by layer. Weak in the Z direction (layer adhesion). Overhangs beyond ~45° require support material. Excellent for complex geometry, poor for high-load structural parts."
            },
            {
              term: "Injection Molding",
              definition: "Molten material injected into a mold. Requires draft angles on all vertical walls for part ejection. Wall thickness must be uniform to prevent sink marks and warping."
            }
          ]
        },
        {
          type: "callout",
          kind: "tip",
          content: "When prototyping, it's common to 3D print a part first to check fit. Just know that a print is not a functional test of a machined part — the failure modes are completely different."
        }
      ]
    },

    /* ── SECTION 3 ──────────────────────────────────── */
    {
      title: "Tolerancing Fundamentals",
      blocks: [
        {
          type: "text",
          content: [
            "A tolerance is the acceptable range of variation for a dimension. No manufacturing process is perfectly repeatable — every part will vary slightly from the nominal (design) dimension. Tolerances define how much variation is acceptable before a part fails to function.",
            "Over-tolerancing (specifying tighter tolerances than necessary) is one of the most common and costly mistakes in engineering. Tighter tolerances mean more machining time, more inspection, and more rejected parts. Always ask: what tolerance does this feature actually need to function?"
          ]
        },
        {
          type: "keyterms",
          title: "Tolerance Terminology",
          items: [
            {
              term: "Nominal dimension",
              definition: "The target or ideal value of a dimension, e.g. 25.00 mm."
            },
            {
              term: "Tolerance",
              definition: "The total allowable variation. A tolerance of ±0.1 mm on a 25 mm dimension means any value from 24.9 to 25.1 mm is acceptable."
            },
            {
              term: "Clearance fit",
              definition: "The shaft is always smaller than the hole — there is always a gap. Used for parts that need to slide or rotate freely."
            },
            {
              term: "Interference fit",
              definition: "The shaft is always larger than the hole — it must be pressed in. Creates a strong mechanical joint without fasteners."
            },
            {
              term: "Transition fit",
              definition: "The fit may be either clearance or interference depending on where within tolerance each part lands."
            }
          ]
        },
        {
          type: "callout",
          kind: "warning",
          content: "A common mistake: using ±0.001\" tolerances everywhere because it 'looks more precise.' This can multiply part cost by 3–5x with no functional benefit. Tolerance to function, not to habit."
        },
        {
          type: "image",
          caption: "Fit Types: Clearance, Transition, Interference",
          hint: "Side-by-side diagram of shaft/hole pairs showing the three fit types with example tolerance values"
        }
      ]
    },

    /* ── SECTION 4 ──────────────────────────────────── */
    {
      title: "GD&T Basics",
      blocks: [
        {
          type: "text",
          content: [
            "Geometric Dimensioning and Tolerancing (GD&T) is a symbolic language for communicating tolerances on engineering drawings. It goes beyond simple ±dimensional tolerances to define the acceptable variation in form, orientation, location, and runout of features.",
            "GD&T is the standard used in professional engineering and manufacturing. Learning to read and apply even the most common symbols will make your drawings clearer, more manufacturable, and less likely to be misinterpreted by a fabricator."
          ]
        },
        {
          type: "keyterms",
          title: "Most Common GD&T Symbols",
          items: [
            {
              term: "Flatness ⏥",
              definition: "All points on a surface must lie within two parallel planes separated by the tolerance value. Controls surface quality independent of any datum."
            },
            {
              term: "Perpendicularity ⊥",
              definition: "A surface or axis must be within a tolerance zone perpendicular to a datum. Critical for mating faces and press fits."
            },
            {
              term: "True Position ⊕",
              definition: "The center of a hole or feature must fall within a cylindrical tolerance zone centered on the true position. More flexible than ± coordinate tolerances."
            },
            {
              term: "Concentricity / Runout ◎",
              definition: "Controls how much a feature deviates from a central axis during rotation. Critical for shafts, pulleys, and rotating assemblies."
            }
          ]
        },
        {
          type: "callout",
          kind: "tip",
          content: "You don't need to memorize every GD&T symbol — but you should be fluent with flatness, perpendicularity, and true position. Those three cover the majority of real-world drawings."
        },
        {
          type: "image",
          caption: "GD&T Feature Control Frame Anatomy",
          hint: "Labeled diagram of a GD&T feature control frame showing the symbol, tolerance value, and datum reference"
        }
      ]
    },

    /* ── SECTION 5 ──────────────────────────────────── */
    {
      title: "Material Selection",
      blocks: [
        {
          type: "text",
          content: "Material selection and DFM are tightly linked — the same geometry may be trivial to manufacture in one material and nearly impossible in another. Beyond just mechanical properties, material choice affects what processes are available, what tolerances are achievable, and what the part will cost."
        },
        {
          type: "keyterms",
          title: "Common Engineering Materials",
          items: [
            {
              term: "6061-T6 Aluminum",
              definition: "The workhorse of structural robotics and prototyping. Excellent strength-to-weight ratio, machines beautifully, anodizes well. Weaker at welded joints — use 6061 for machined parts, 5052 for sheet metal."
            },
            {
              term: "4130 / 4140 Steel",
              definition: "High-strength alloy steels used where aluminum isn't strong enough. Heavier and harder to machine, but significantly stronger. Good for shafts, gussets, and high-stress joints."
            },
            {
              term: "PLA / PETG (FDM)",
              definition: "Common FDM print materials. PLA is stiff and easy to print but brittle and heat-sensitive. PETG offers better toughness and temperature resistance. Neither is suitable for high-load structural applications."
            },
            {
              term: "Delrin (Acetal POM)",
              definition: "A machinable engineering plastic. Excellent for bearings, bushings, and wear surfaces. Self-lubricating, dimensionally stable. A great substitute for metal in low-load sliding interfaces."
            }
          ]
        },
        {
          type: "checklist",
          title: "Material Selection Checklist",
          items: [
            { type: "do",   text: "Define your load case before picking a material" },
            { type: "do",   text: "Consider the manufacturing process — will this material machine cleanly?" },
            { type: "do",   text: "Check material availability in the stock sizes you need" },
            { type: "dont", text: "Don't default to steel when aluminum will work — you're adding weight for no reason" },
            { type: "dont", text: "Don't assume a 3D-printed part has the same properties as a machined one" },
            { type: "dont", text: "Don't ignore thermal expansion if the part operates in a hot environment" }
          ]
        }
      ]
    },

    /* ── SECTION 6 ──────────────────────────────────── */
    {
      title: "DFM in Practice: Common Rules",
      blocks: [
        {
          type: "text",
          content: "Abstract principles are useful, but DFM is most powerful when you internalize a set of concrete rules for each process. Below are the most impactful rules for the processes you'll encounter most as an intermediate engineer."
        },
        {
          type: "steps",
          title: "DFM Rules for CNC Machining",
          items: [
            {
              heading: "Design for standard tool sizes",
              detail: "Inside corner radii should match standard end mill sizes (1/8\", 3/16\", 1/4\"). Odd radii require custom tooling or extra setups — both cost more."
            },
            {
              heading: "Avoid deep, narrow pockets",
              detail: "Depth-to-width ratio > 4:1 causes tool deflection and poor surface finish. If you need depth, increase the pocket width or use a stepped approach."
            },
            {
              heading: "Minimize setups",
              detail: "Every time a part needs to be repositioned in the machine, it adds time and potential for error. Design features so they can be machined from as few orientations as possible."
            },
            {
              heading: "Chamfer instead of fillet on external edges",
              detail: "External chamfers are faster to machine and add less stress concentration than sharp edges, without requiring a ball-end mill pass."
            }
          ]
        },
        {
          type: "steps",
          title: "DFM Rules for Sheet Metal",
          items: [
            {
              heading: "Minimum bend radius = material thickness",
              detail: "Bending tighter than the material thickness causes cracking on the outer face. For 90° bends in 1/8\" aluminum, keep your inside bend radius ≥ 1/8\"."
            },
            {
              heading: "Minimum hole-to-edge distance = 2× material thickness",
              detail: "Holes too close to an edge or bend will distort or tear during punching or bending. Keep holes well clear of bends and edges."
            },
            {
              heading: "Use tab-and-slot for alignment",
              detail: "Laser-cut tabs that slot into matching holes allow precise positioning before welding or riveting, eliminating the need for fixtures."
            }
          ]
        },
        {
          type: "callout",
          kind: "example",
          content: "A team redesigned their arm bracket by adding 0.125\" corner radii to all inside pockets (matching their shop's smallest end mill), removing one machining setup, and adjusting two hole locations away from a bend. Result: part cost dropped by 35% with no change to function."
        },
        {
          type: "checklist",
          title: "Pre-Release DFM Review",
          items: [
            { type: "do", text: "All inside corner radii match standard tool sizes" },
            { type: "do", text: "Tolerances are the loosest values that still allow function" },
            { type: "do", text: "Drawing includes a datum scheme that matches how the part is fixtured" },
            { type: "do", text: "Material and finish are explicitly called out" },
            { type: "do", text: "All features are accessible from a defined set of machine setups" },
            { type: "dont", text: "No tolerances tighter than ±0.001\" without a specific functional reason" },
            { type: "dont", text: "No deep narrow pockets (depth > 4× width)" }
          ]
        }
      ]
    }

  ] // end sections
};


// Hand off to the renderer
document.addEventListener('DOMContentLoaded', () => renderModulePage(MODULE_CONTENT));