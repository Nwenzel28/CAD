/* ═══════════════════════════════════════════════════════
   ORANGINEERING — Module 01: Design for Manufacturing
   Content data file (module-01-data.js)
═══════════════════════════════════════════════════════ */

const MODULE_CONTENT = {
  number:      "01",
  title:       "Design for Manufacturing",
  difficulty:  "Intermediate",
  duration:    "~3.5 hrs",
  description: "A first-principles look at CNC machining DFM. Learn how machine architecture, tooling, workholding, and feature geometry connect — and how to use that understanding to design parts that are cheaper, faster, and better to manufacture.",
  topics:      ["Machine Architecture", "Tooling", "Workholding", "Cost Drivers", "Feature Guidelines", "Tolerancing", "Vibration & Compliance"],
  prevModule:  null,
  nextModule:  "02-iteration.html",

  sections: [

    /* ══════════════════════════════════════════════════
       SECTION 1 — Why CNC DFM Matters
    ══════════════════════════════════════════════════ */
    {
      title: "Why CNC DFM Matters",
      blocks: [
        {
          type: "text",
          content: [
            "CNC machining is the most important manufacturing process for an engineer to understand — not just because you will design machined parts, but because CNC machining produces the majority of the tooling used in every other manufacturing process. The molds for injection molding, the dies for stamping, the tools for forging — nearly all of it is made on a CNC machine. In that sense, CNC machining is the mother process that enables the entire manufacturing economy.",
            "Design for Manufacturing (DFM) is the discipline of making design decisions with the manufacturing process in mind from the start. In CNC machining specifically, this means understanding how machine capabilities, tooling, fixturing, and feature geometry interact to determine part cost and quality. Most DFM guides hand you a list of rules. This module gives you the principles behind those rules, so you can reason through cases the rules don't cover."
          ]
        },
        {
          type: "callout",
          kind: "note",
          content: "The goal of DFM is not to constrain your designs — it's to give you enough manufacturing knowledge to make informed trade-offs. Sometimes a complex feature is worth the cost. DFM helps you know when it is, and when it isn't."
        },
        {
          type: "text",
          content: [
            "There is a direct relationship between how well you understand the machining process and how cost-effectively you can design. Engineers who think of DFM as a list of rules to check at the end of a design cycle consistently produce more expensive, harder-to-manufacture parts than engineers who build manufacturing intuition into their design process from day one.",
            "This module works through CNC machining from the ground up: how the machines work, what tooling is available, how parts get fixtured, what actually drives cost, and finally how individual features can be designed to minimize that cost. By the end, you will have a mental model of the machining process that you can apply to any part — not just the examples covered here."
          ]
        },
        {
          type: "challenge",
          difficulty: "beginner",
          title: "DFM First Instincts",
          prompt: "Before diving in, test your current instincts. A machinist receives a drawing for the bracket described below. Without any formal DFM knowledge, which features do you expect might be problems — and why?",
          context: "A 6061 aluminum bracket, roughly 150mm x 80mm x 40mm, with the following features: a central pocket 6mm wide and 50mm deep; four M4 tapped holes on the top face; a 1mm fillet on all interior edges; a 35-degree chamfer on one external edge; surface finish of Ra 0.4 micrometers on all surfaces.",
          tasks: [
            "List every feature you think might be difficult or expensive to machine, and give a one-sentence reason for each.",
            "Rank them from most to least problematic.",
            "After finishing this module, come back and check your answers against what you have learned."
          ],
          hint: "Think about each feature in terms of what tool would need to cut it, how long that would take, and whether the feature geometry creates any physical constraints on tool access.",
          answer: "Most problematic to least: (1) 6mm wide x 50mm deep pocket — 8:1 depth-to-width ratio, far beyond the practical limit. This will require special extended-reach tooling, slow feed rates, and risks tool breakage. (2) Ra 0.4 micrometers on all surfaces — this finish requires slow finishing passes everywhere, massively increasing machine time. Should only be applied to functional surfaces. (3) 1mm fillet on all interior edges — requires a 2mm diameter end mill, which is fragile and slow. Should be increased to the largest practical standard size. (4) 35-degree chamfer — not a standard chamfer tool angle (60, 82, and 90 degrees are standard). Will require a surfacing operation with a ball end mill. (5) Four M4 tapped holes on the top face — not inherently problematic, but tapping adds an operation and there is a risk of tap breakage in blind holes."
        }
      ]
    },

    /* ══════════════════════════════════════════════════
       SECTION 2 — How CNC Milling Machines Work
    ══════════════════════════════════════════════════ */
    {
      title: "How CNC Milling Machines Work",
      blocks: [
        {
          type: "text",
          content: [
            "Understanding the architecture of the machine that will cut your parts is the foundation of CNC DFM. A modern CNC milling machine is a precisely controlled, computer-driven system that moves a cutting tool (or the workpiece, or both) through programmed paths to remove material. Most job shops run a mix of 3-axis and 5-axis machines, each with a distinct set of capabilities and limitations."
          ]
        },
        {
          type: "keyterms",
          title: "3-Axis vs. 5-Axis Machines",
          items: [
            {
              term: "3-Axis Vertical Mill",
              definition: "The workhorse of most job shops. A rectangular table moves in X and Y, and the spindle moves in Z (up and down). The machine can reach any point on the top face of the part and any vertical side wall — but it cannot tilt the tool relative to the part. All features must be accessible from a fixed orientation. A typical machine like a Haas VF-2 has roughly 1000mm x 500mm of table travel, spindle speeds of 8,000-15,000 RPM, and a tool magazine holding 20-30 tools."
            },
            {
              term: "5-Axis Mill",
              definition: "Adds two rotational axes (typically called B and C) to the standard X, Y, Z motion. This allows the tool to be tilted and rotated relative to the part, enabling features on multiple faces to be cut in a single setup and allowing access to undercuts and complex curved surfaces. 5-axis machines are more expensive to run and program, but can eliminate setups that would otherwise add significant cost on a 3-axis machine."
            },
            {
              term: "3+2 Machining",
              definition: "A common strategy where the B and C axes of a 5-axis machine are used to position the part at a fixed angle, and then standard 3-axis toolpaths are run. This gets many of the setup-reduction benefits of 5-axis without the full programming complexity of simultaneous 5-axis motion. Most complex parts can be done in 3+2."
            },
            {
              term: "Simultaneous 5-Axis",
              definition: "All five axes move at the same time, allowing the tool to follow complex curved surfaces while continuously adjusting its orientation. Used in applications like turbine blades, impellers, and highly contoured aerospace parts. Requires specialized programming and significantly more machine time. Very rarely needed for typical engineering parts."
            }
          ]
        },
        {
          type: "text",
          content: [
            "Modern CNC mills have several capabilities worth knowing as a designer. Automatic tool changers let the machine swap between 20-50 tools without stopping — meaning complex parts with many different features can be cut in a single run. Touch probes (like the Renishaw OMP60) measure the exact position of the workpiece in the machine coordinate system at the start of each job, eliminating the human error of manual setup. Automatic tool setting systems measure each tool's exact length and diameter before cutting, compensating for any deviation from nominal.",
            "These capabilities matter for DFM because they inform what is genuinely hard and what just seems hard. Tool changes are essentially free — using 12 different tools in one program adds almost no cost. What adds cost is anything that requires the machine to stop, the operator to intervene, or the part to be repositioned. Keep that distinction in mind as you design."
          ]
        },
        {
          type: "image",
          caption: "3-Axis vs. 5-Axis Machine Architecture",
          hint: "Side-by-side diagram: 3-axis machine showing X/Y table and Z spindle motion only; 5-axis machine showing the same plus B-axis tilt and C-axis rotation, with arrows indicating each degree of freedom"
        },
        {
          type: "callout",
          kind: "tip",
          content: "When you are unsure whether your part needs 5-axis machining, ask this: can all the features on your part be accessed by a tool pointing straight down (or from the side in a second setup)? If yes, it is a 3-axis part. If a feature requires the tool to approach at an angle that a vertical spindle cannot achieve, you may need 5-axis or a creative fixturing solution."
        },
        {
          type: "challenge",
          difficulty: "beginner",
          title: "3-Axis or 5-Axis?",
          prompt: "For each part description below, determine whether it can be machined on a 3-axis machine (with up to two setups), or whether it requires a 5-axis machine. Justify your answer.",
          context: "Part A: A rectangular aluminum block with pockets on the top face, four through-holes on the bottom face, and a counterbore on the top face. Part B: A cylindrical housing with six radial holes drilled around the circumference at 60-degree intervals, all perpendicular to the cylinder axis. Part C: An aircraft bracket with a curved surface on the top face, mounting holes on three different non-parallel faces, and a dovetail slot on the underside.",
          tasks: [
            "Classify each part as 3-axis (1 or 2 setups) or requiring 5-axis. Explain your reasoning for each.",
            "For any part you classify as 3-axis with 2 setups, describe what each setup would machine.",
            "For any part you classify as 5-axis, identify the specific feature that forces that requirement."
          ],
          hint: "For each feature on each part, ask: can a vertically-oriented spindle reach this feature? Then ask: can this be done from the top, or from the top plus one flip?",
          answer: "Part A: <strong>3-axis, 2 setups.</strong> Setup 1 machines the top face pockets and counterbore with the part sitting flat. Setup 2 flips the part and drills the bottom face holes. All features are accessible from directly above.<br><br>Part B: <strong>3-axis, 6+ setups OR 5-axis.</strong> Each radial hole requires the part to be rotated 60 degrees. On a 3-axis machine this means re-fixturing six times (once per hole family) using an indexing fixture or rotary table. On a 5-axis machine in 3+2 mode, all six holes can be done in one setup by indexing with the B/C axes. The 5-axis approach is almost certainly cheaper at any quantity beyond a handful of parts.<br><br>Part C: <strong>5-axis required, or 3-axis with many setups.</strong> The mounting holes on three non-parallel faces require three separate fixturing orientations on a 3-axis machine. The dovetail slot on the underside requires either a lollipop/undercut tool in a 3-axis setup or a 5-axis approach. The curved top surface can technically be surfaced on a 3-axis machine. The combination of all these features makes 5-axis strongly preferred."
        }
      ]
    },

    /* ══════════════════════════════════════════════════
       SECTION 3 — Tooling: What the Shop Has and Why It Matters
    ══════════════════════════════════════════════════ */
    {
      title: "Tooling: What the Shop Has and Why It Matters",
      blocks: [
        {
          type: "text",
          content: [
            "Every feature you put on a part will be cut by a specific tool. The single most powerful DFM habit you can build is thinking about the tool before you draw the feature. If you design a feature that requires a tool the shop does not have, you will either pay for a special order, wait for it to arrive, or get a call asking you to redesign. All three outcomes are bad.",
            "Most job shops maintain a standard set of tooling that covers the vast majority of common features. Designing within that standard set keeps cost down and lead times short. Designing outside it — even by small amounts, like specifying a 2.3mm corner radius when 3/16 inch is standard — creates friction at every step of the manufacturing process."
          ]
        },
        {
          type: "keyterms",
          title: "Standard Shop Tooling",
          items: [
            {
              term: "Flat End Mills",
              definition: "The most common milling tool. Used for pockets, profiles, slots, and facing operations. Available in fractional inch sizes (1/8, 3/16, 1/4, 5/16, 3/8, 1/2, 5/8, 3/4, 1 inch) and metric sizes (3, 4, 5, 6, 8, 10, 12, 16, 20mm). Design all pocket corner radii and profile features to match one of these standard sizes. The larger the end mill you can use, the faster the material removal rate."
            },
            {
              term: "Ball End Mills",
              definition: "End mills with a hemispherical tip. Used for 3D surfacing operations, fillets on floors of pockets, and any curved surface that is not parallel to the spindle axis. Surfacing with a ball end mill requires many small passes (called a stepover), which creates a scalloped surface finish and takes significant machine time. Avoid features that require ball end mill surfacing unless function demands it."
            },
            {
              term: "Chamfer Mills (V-tools)",
              definition: "Conical tools used to cut chamfer features. Standard included angles are 60 degrees, 82 degrees, and 90 degrees. A chamfer at one of these angles is a fast, single-pass operation. Any other chamfer angle requires a surfacing operation with a ball end mill, which is dramatically slower. This is an easy DFM win: standardize all your chamfers to 45 degrees (90-degree included angle tool)."
            },
            {
              term: "Drill Bits",
              definition: "Used for through-holes and blind holes. Available in standard fractional, letter, and number sizes as well as metric. Twist drills are fast and cheap for most holes. For very deep holes (over 10x diameter), coolant-through deep drills can reach 20x diameter. Design hole diameters to standard drill sizes — an oddly sized hole typically requires interpolation with an end mill, which is much slower."
            },
            {
              term: "Taps",
              definition: "Used to cut internal threads. Available for all standard thread forms (UNC, UNF, metric). Tapping is a standard operation but adds time, tooling cost per part (taps wear and break), and risk — especially in blind holes where a broken tap can scrap the part. Through-tapped holes are lower risk than blind tapped holes."
            },
            {
              term: "Face Mills",
              definition: "Large-diameter multi-insert cutters used for facing (flattening large surfaces). Extremely fast material removal rate on flat surfaces. Parts that require large amounts of stock to be removed from a face will benefit from being designed to allow face mill access — meaning the face should be open and flat, not surrounded by walls that prevent the large cutter from reaching it."
            }
          ]
        },
        {
          type: "callout",
          kind: "note",
          content: "Some shops will also have less-common tooling that can solve problems that otherwise look expensive. Extended-reach end mills have longer flute lengths for deep pockets with small radii. Relieved-shank end mills have a narrowed shank below the cutting area, allowing deep pocket access without sidewall interference. Lollipop (undercut) cutters allow up to 300 degrees of access to a spherical cutting volume, enabling undercut chamfers in a 3-axis setup. Dovetail cutters create undercut dovetail profiles. Knowing these tools exist can save you from specifying 5-axis machining when a clever 3-axis tooling choice would work."
        },
        {
          type: "text",
          content: [
            "The relationship between tool diameter and pocket depth is one of the most important numbers in CNC DFM. As a general guide: pockets up to 4x the tool diameter deep are standard. Up to 6x diameter is common with off-the-shelf tooling. 6x to 10x diameter requires extended-reach or relieved-shank tools, which most shops will need to order. Beyond 10x diameter is genuinely challenging regardless of tooling and should be avoided or redesigned.",
            "This ratio matters because as a tool gets longer relative to its diameter, it becomes less stiff. A less stiff tool deflects under cutting forces, causing dimensional errors, poor surface finish, and eventual tool breakage. Extended-reach tools partially solve this by increasing flute length, and relieved-shank tools solve it by removing material from the shank so it does not contact the pocket sidewall. Both are useful to know about, but both are slower than cutting with a standard-length tool."
          ]
        },
        {
          type: "image",
          caption: "Tool Depth-to-Diameter Ratio Guide",
          hint: "Bar chart or diagram showing tool types vs. achievable depth-to-diameter ratios: standard end mill (up to 4:1), extended flute (up to 6:1), extended reach/relieved shank (up to 10:1), with a red zone beyond 10:1"
        },
        {
          type: "challenge",
          difficulty: "intermediate",
          title: "Tooling Decisions",
          prompt: "A bracket design has the following pockets and features. For each one, specify the smallest standard end mill size that can cut it, whether any special tooling is needed, and flag any features that should be redesigned.",
          context: "Feature A: A pocket 25mm wide, 18mm deep, with 3mm corner radii. Feature B: A pocket 8mm wide, 60mm deep, with 2mm corner radii. Feature C: An external profile with a continuous 45-degree chamfer that wraps around three faces of the part, including two corners where faces meet at 90 degrees. Feature D: A slot 6mm wide, 30mm deep, open on one end. Feature E: A through-hole, 7mm diameter.",
          tasks: [
            "For each feature, identify the tool required and flag any DFM concerns.",
            "Feature B has the worst depth-to-diameter ratio. Calculate it and classify it against the guide above.",
            "Propose a redesign for any feature you flagged as problematic."
          ],
          hint: "For each feature, first find the constraining dimension (usually the smallest radius or width), then find the largest standard tool that fits. Then check the depth against that tool diameter to get the ratio.",
          answer: "Feature A: 3mm corner radius constrains to a 6mm (1/4 inch) end mill. Depth 18mm / diameter 6mm = 3:1 ratio. Standard, no issues.<br><br>Feature B: 2mm corner radius requires a 4mm end mill. Depth 60mm / diameter 4mm = <strong>15:1 ratio</strong>. This is far beyond the 10:1 practical limit. Flagged — redesign required. Options: widen the pocket to at least 10mm (allowing a larger tool and bringing the ratio to 6:1), reduce depth to 40mm max, or redesign as an open slot so a slitting saw can be used.<br><br>Feature C: A chamfer wrapping continuously around three faces, including at the corners where faces meet, cannot be cut with a standard chamfer mill (which only works on flat faces). This requires either ball end mill surfacing in multiple setups or simultaneous 5-axis machining. Flagged — determine if the chamfer is structural/functional. If aesthetic only, remove it. If needed, break it into flat chamfers on each face only, stopping before the corners.<br><br>Feature D: 6mm wide, 30mm deep, open on one end. Use a 6mm (1/4 inch) end mill. Depth 30mm / diameter 6mm = 5:1. Within standard range for a careful setup, but borderline. Consider a slitting saw if the slot width can match a standard saw thickness. No flag needed but worth discussing with the shop.<br><br>Feature E: 7mm diameter through-hole. This is not a standard drill size. A 7mm metric drill is standard — if you are working in metric, no issue. If the drawing is in inches, the equivalent is 0.2756 inch which has no standard drill. Redesign to the nearest standard size (17/64 = 0.266 inch, or 9/32 = 0.281 inch) or specify 7mm explicitly on a metric drawing."
        }
      ]
    },

    /* ══════════════════════════════════════════════════
       SECTION 4 — Workholding and Setups
    ══════════════════════════════════════════════════ */
    {
      title: "Workholding and Setups",
      blocks: [
        {
          type: "text",
          content: [
            "Workholding — how the part is held in the machine — is one of the most underappreciated aspects of DFM. A feature that is geometrically simple to cut can still be expensive if the part is hard to hold securely while cutting it. Conversely, thoughtful part geometry can enable elegant fixturing solutions that reduce cost and improve quality.",
            "Every time a part is repositioned in a fixture, the machinist must re-measure its position in the machine's coordinate system. This takes time and introduces error. Features that are toleranced relative to each other should ideally be machined in the same setup, because within a single setup the machine's own positional accuracy (typically ±10 micrometers) ensures tight relative tolerances with no extra effort. Splitting toleranced features across setups means stacking the fixturing uncertainty of two separate setups — a much larger error source."
          ]
        },
        {
          type: "keyterms",
          title: "Common Workholding Setups",
          items: [
            {
              term: "Machine Vise with Work Stop",
              definition: "The most common setup in any shop. A precision vise clamps the part in one axis; a work stop (a fixed reference surface) locates it in a second axis. Parallels in the vise jaw control the height. This setup is fast to load, accurate, and handles the vast majority of prismatic parts. Designing your parts to be held in a standard vise — meaning they have two parallel flat faces that can be clamped — keeps setup cost to a minimum."
            },
            {
              term: "Softjaws",
              definition: "Custom-machined aluminum or plastic vise jaw inserts that are profiled to match the shape of a partially-machined part. Used when a part's geometry after the first operation no longer has flat parallel faces to clamp in a standard vise. Softjaws are the most common custom fixture in any shop — inexpensive to make and very effective. They are typically used for second operations in a double-vise setup: first operation in a standard vise, second operation in softjaws."
            },
            {
              term: "Double Vise Setup",
              definition: "Two vises on the same machine table, one with standard jaws (for first operations on raw stock) and one with softjaws (for second operations on partially-machined parts). This setup allows a part to be completed — all features on both faces — without leaving the machine. The key DFM implication: if your part can be designed so that all features are accessible from two opposing faces, it can be completed in a double-vise setup, which is the most efficient and cost-effective configuration."
            },
            {
              term: "Custom Fixture Plates",
              definition: "For higher quantities, custom plates are machined with multiple work-holding positions so that several parts can be cut simultaneously. Workholding devices (like Mitee-Bite pitbull clamps) hold the raw stock securely while it is machined. The upfront investment in fixture design and machining is amortized across the production run. Not relevant for prototype quantities, but important for production planning."
            },
            {
              term: "Dovetail Vise (5-Axis)",
              definition: "A specialized fixture where a dovetail feature is first machined into the raw stock, and then the stock is clamped in a matching dovetail vise. This leaves five faces of the part accessible to the machine, allowing all non-bottom features to be machined in a single 5-axis setup. The dovetail prep adds time, but the elimination of multiple setups typically makes it worthwhile on a 5-axis machine."
            }
          ]
        },
        {
          type: "callout",
          kind: "tip",
          content: "<strong>The double-vise rule:</strong> When designing a part, ask early whether all features can be accessed from two opposing faces. If yes, the part can be made in a standard double-vise setup — the single most cost-effective CNC configuration. This one question, asked early, eliminates the need for custom fixtures on a large proportion of parts."
        },
        {
          type: "text",
          content: [
            "Part compliance — how much the part flexes under clamping and cutting forces — is one of the most difficult workholding challenges to reason about from a drawing. A part that looks stiff in CAD may be very compliant once the first operation has removed material, creating thin walls, cantilevered features, or unsupported membranes.",
            "This matters in two ways. First, a compliant part cannot be clamped hard enough to resist cutting forces, so the machinist must reduce feed rates, slowing the job and increasing cost. Second, a compliant part may spring back after being clamped, meaning the dimensions you measure while it is in the vise are different from the dimensions when it is released. This is particularly insidious for tight tolerances — a part can pass in-process inspection and then fail final inspection after release from the fixture.",
            "The design principle is straightforward: think about how stiff your part will be at the point of its second operation, after the first operation has removed material. If the answer is 'not very', redesign to preserve stiffness — add ribs, keep walls thicker, or redesign the first operation to remove less material."
          ]
        },
        {
          type: "image",
          caption: "Workholding Setup Progression",
          hint: "Three diagrams side by side: (1) standard vise with raw block, (2) softjaw vise with a partially-machined part, (3) double-vise setup with both operations shown on one machine table"
        },
        {
          type: "challenge",
          difficulty: "intermediate",
          title: "Workholding Strategy",
          prompt: "You are planning the machining of a 6061 aluminum electronics enclosure. The part is a box shape — open on the bottom — with four mounting bosses on the top face, cable pass-through holes on two side faces, and a precise alignment groove on the inside front face.",
          context: "The part starts as a solid aluminum block, approximately 120mm x 80mm x 50mm. The final part has 3mm wall thickness on all sides and a solid top face 8mm thick. The inside of the box is a single large pocket. The alignment groove is 4mm wide, 3mm deep, on the inside front wall, toleranced to ±0.05mm position relative to the mounting boss pattern on the top face.",
          tasks: [
            "Describe the minimum number of setups needed to machine this part and what is machined in each.",
            "Identify the compliance risk: after which operation does the part become potentially too flexible to hold accurately?",
            "The alignment groove is toleranced relative to the top-face mounting bosses. Which setup should machine both features, and why?",
            "Propose one design change that would reduce the compliance risk without significantly changing part function."
          ],
          hint: "Think about the order of operations. The inside pocket makes the walls thin — that is your compliance event. Features that are toleranced to each other must be machined in the same setup to avoid fixturing error stacking.",
          answer: "Minimum setups: <strong>2 setups.</strong> Setup 1 (part sitting on its solid top face, clamped in standard vise): machine the mounting bosses and their hole pattern on the top face, machine the cable pass-through holes on both side faces using a 3+2 tilt (or a separate manual flip for each side on a 3-axis machine). Setup 2 (part flipped, sitting on top face in softjaws): machine the large internal pocket and the alignment groove on the inside front wall.<br><br>Compliance risk: after Setup 2 (machining the internal pocket). Once the pocket is cut, the walls are 3mm thick and largely unsupported. The front wall — where the alignment groove sits — will flex noticeably under clamping.<br><br>The alignment groove must be machined in the <strong>same setup as the mounting bosses</strong> — but currently that is impossible because the groove is on the inside, which is only accessible after the pocket is cut. Solution: machine the groove in Setup 2 with the pocket, but also re-machine or re-probe the boss positions as a reference datum in that same setup. This requires a reference datum feature on the outside of the part that was cut in Setup 1 and is accessible in Setup 2 — for example, a precision-bored reference hole on the outside face that allows the Setup 2 program to locate itself relative to Setup 1 geometry.<br><br>Design change to reduce compliance: increase the top-face wall thickness to 12mm (from 8mm), giving the part more stiffness during Setup 2. Alternatively, add a thin internal rib from front wall to back wall that gets removed in a third operation — but this adds a setup. The wall thickness increase is simpler."
        }
      ]
    },

    /* ══════════════════════════════════════════════════
       SECTION 5 — What Actually Drives Cost
    ══════════════════════════════════════════════════ */
    {
      title: "What Actually Drives Cost",
      blocks: [
        {
          type: "text",
          content: [
            "Understanding cost is central to DFM. A machined part's cost has two fundamental components: fixed costs (incurred once per job regardless of quantity) and variable costs (incurred once per part). Both can be influenced by design decisions, but they respond differently across the production lifecycle. A design optimization that makes sense at 5 parts may be irrelevant at 5,000 parts — and vice versa."
          ]
        },
        {
          type: "keyterms",
          title: "Fixed Cost Drivers (Amortized Across Quantity)",
          items: [
            {
              term: "Programming and NRE",
              definition: "Planning the job and writing the CNC programs (toolpaths) is non-recurring engineering work — it happens once per part design, regardless of quantity. For complex parts, programming can represent a large fraction of total prototype cost. The direct design link: more complex geometry, more setups, and less standard tooling all increase programming time. Designing for standard tooling and simple setups reduces programming cost directly."
            },
            {
              term: "Job Setup at the Machine",
              definition: "Loading tools, installing fixtures, measuring work offsets, and setting up the machine for a job is also a fixed cost per job. A standard double-vise setup with common tooling takes an experienced machinist 30–60 minutes. A custom fixture plate with specialized tooling can take half a day. The amortization of setup cost is why the break-even between prototype and production tooling strategies depends heavily on quantity."
            }
          ]
        },
        {
          type: "keyterms",
          title: "Variable Cost Drivers (Proportional to Quantity)",
          items: [
            {
              term: "Machining Time",
              definition: "The single largest variable cost driver. Machining time is a direct function of how much material must be removed and how fast it can be removed. Material Removal Rate (MRR) is driven by tool size and stiffness — large face mills remove material orders of magnitude faster than small ball end mills. Design principle: enable the bulk of material removal to happen in the first operation (most secure workholding, stiffest part), and design features to be cut by the largest possible tools."
            },
            {
              term: "Part Setup Time",
              definition: "Each part must be loaded into the fixture manually by an operator. Simple fixtures that locate repeatably and clamp quickly reduce this time. High tolerance requirements increase setup time because the operator must clean fixtures more carefully to ensure no chips or debris affect the seating of the part."
            },
            {
              term: "Tooling Wear",
              definition: "Tools wear out and must be replaced. For prototype quantities, tooling cost is negligible. At production volumes, harder materials (steel, titanium, inconel) wear tools much faster than aluminum and the cost becomes significant. Designing parts with minimal material removal and using softer alloys where possible controls this cost driver at scale."
            },
            {
              term: "Inspection",
              definition: "Every tolerance on your drawing potentially requires a measurement. A caliper check on a non-critical dimension costs seconds. A CMM inspection of a critical bore with a formal report costs minutes per dimension. Go/no-go gauges are cheap. Precision bore gauges accurate to 0.005mm are expensive. The cost of inspection scales with both the tightness and the number of tolerances you specify. Apply tolerances only where function demands them."
            }
          ]
        },
        {
          type: "callout",
          kind: "warning",
          content: "<strong>The tolerance cost curve is nonlinear.</strong> Going from ±0.5mm to ±0.1mm might add 20% to part cost. Going from ±0.05mm to ±0.013mm (±0.0005 inch) can multiply cost by 5x or more — because at that level you are no longer controlling just the tool, you are controlling machine temperature, coolant temperature, tool deflection, and workpiece thermal expansion. Some shops simply cannot hold these tolerances at all without environmental controls. Specify tight tolerances only where function genuinely requires them, and always ask what tolerance the feature actually needs."
        },
        {
          type: "text",
          content: [
            "A few cost-reduction principles that follow directly from this breakdown:",
            "<strong>Smaller parts cost less.</strong> Less material to remove, faster machining, easier handling.",
            "<strong>High stock-to-part volume ratio costs more.</strong> Starting with a 2kg block to make a 200g part means removing 1.8kg of material. Near-net-shape stock (extrusions, castings) that closely approximates the final part geometry dramatically reduces machining time.",
            "<strong>Surface finish requirements have a non-linear impact.</strong> Going from a standard milling finish (Ra 3.2 micrometers) to Ra 0.8 micrometers adds extra passes. Going to Ra 0.2 micrometers often requires grinding. Only specify tight surface finishes where there is a specific functional reason — sealing faces, bearing bores, precision sliding surfaces.",
            "<strong>Non-standard angles and complex surfaces are slow.</strong> A chamfer at 45 degrees is one pass. A chamfer at 37.5 degrees requires surfacing with a ball end mill at tiny stepovers. The geometry is not technically difficult — modern CAM software can program it easily — but the machine time increases massively."
          ]
        },
        {
          type: "challenge",
          difficulty: "intermediate",
          title: "Cost Driver Analysis",
          prompt: "Two engineers submit designs for the same functional bracket. Engineer A's design has been optimized for function without DFM consideration. Engineer B's design incorporates DFM from the start. Review the differences and estimate the cost impact.",
          context: "Engineer A: 12 different tolerance callouts, tightest is ±0.008mm. Surface finish Ra 0.8 micrometers on all machined faces. 4 pockets with 2mm corner radii. Requires 3 setups (top, bottom, and one side). Material: 4140 steel. Stock: 3kg block, finished part 280g.<br><br>Engineer B: 4 tolerance callouts, tightest is ±0.05mm. Surface finish Ra 3.2 micrometers on structural faces, Ra 0.8 micrometers on two bearing bore faces only. 4 pockets with 4.76mm (3/16 inch) corner radii. Requires 2 setups (top and bottom only). Material: 6061 aluminum. Stock: 1.2kg block, finished part 180g.",
          tasks: [
            "For each cost driver category (machining time, setup, inspection, material/tooling), estimate whether Engineer B's design is cheaper, and by roughly how much.",
            "The only specification both designs must meet is: high stiffness, moderate strength, operating temperature up to 40°C. Does Engineer B's material change create any functional risk?",
            "What one change to Engineer A's design would have the biggest single cost impact?"
          ],
          hint: "Work through each cost driver systematically. For machining time, think about: material hardness, MRR difference between steel and aluminum, stock-to-part ratio, number of setups, and surface finish. For inspection, count the number of tolerance callouts and their tightness.",
          answer: "Cost driver comparison:<br><br><strong>Machining time:</strong> Engineer B is significantly cheaper. Aluminum machines 3–5x faster than 4140 steel. The stock-to-part ratio for A is 3000/280 = 10.7:1 (enormous amount of material removal). For B it is 1200/180 = 6.7:1. B has 2 setups vs. 3. B's 3/16 inch corner radii allow larger end mills with higher MRR. B's surface finish is only tight on 2 faces vs. all faces. Total machining time estimate: B is likely 60–75% less than A.<br><br><strong>Setup:</strong> B has 2 setups vs. 3. Each setup costs roughly the same fixed time. B saves approximately one setup's worth of operator time per part.<br><br><strong>Inspection:</strong> A has 12 tolerances including one at ±0.008mm (likely requiring CMM). B has 4 tolerances with ±0.05mm tightest (likely manageable with calibrated micrometers). Inspection cost for A could easily be 3–5x higher.<br><br><strong>Material:</strong> 4140 steel stock for a 3kg block is more expensive than 6061 aluminum for 1.2kg. Steel also wears tooling faster.<br><br><strong>Functional risk of aluminum:</strong> Low. 6061-T6 has excellent stiffness for the part size, adequate strength for 'moderate' loads, and is fine at 40°C. No risk identified given the stated requirements.<br><br><strong>Biggest single change for Engineer A:</strong> Switching material from 4140 steel to 6061 aluminum. This alone reduces machining time by 60–70%, reduces stock mass, reduces tooling wear, and reduces part mass. If steel is genuinely not needed (and the specs suggest it is not), this is the highest-leverage single change."
        }
      ]
    },

    /* ══════════════════════════════════════════════════
       SECTION 6 — Feature-Specific Guidelines
    ══════════════════════════════════════════════════ */
    {
      title: "Feature-Specific Guidelines",
      blocks: [
        {
          type: "text",
          content: [
            "With an understanding of machines, tooling, workholding, and cost drivers in hand, we can now look at individual features and understand not just the rule but why it exists. DFM guidelines are not arbitrary — each one is a consequence of something physical about the machining process. Understanding the physical reason lets you know when a rule can be relaxed and when it is absolute."
          ]
        },
        {
          type: "steps",
          title: "Pockets and Flat-Bottom Holes",
          items: [
            {
              heading: "Match corner radii to standard end mill sizes",
              detail: "The minimum corner radius in a pocket equals the radius of the cutting tool. Standard end mill diameters in fractional inch are 1/8 (3.175mm), 3/16 (4.76mm), 1/4 (6.35mm), 3/8 (9.53mm), 1/2 (12.7mm). Design all pocket corners to the largest standard size that fits your feature. An odd radius (like 2.3mm or 5mm) requires either a non-standard tool or a slow interpolated path. The common rule of thumb is to use a tool radius slightly smaller than the pocket corner radius — this improves cutter engagement uniformity and surface finish."
            },
            {
              heading: "Keep depth-to-width ratio at or below 6:1 for standard tooling",
              detail: "Pocket depth is limited by tool flute length. The rule: depth up to 4x diameter is completely standard. Up to 6x diameter is achievable with most shops' tooling library. 6–10x requires extended-reach or relieved-shank tools (special order, adds lead time). Beyond 10x is genuinely difficult. If you need a deep narrow pocket, open one end to make it a slot — slitting saws can cut much deeper than end mills. If it must be an enclosed pocket, redesign to widen it."
            },
            {
              heading: "Enable face mill access for large flat surfaces",
              detail: "If your part has a large flat surface that must be faced (flattened), design the geometry so a face mill can access it. Face mills are much larger in diameter than end mills and cannot reach into corners or work next to tall walls. If the surface is surrounded by walls that prevent face mill access, a smaller end mill must be used, dramatically slowing the operation."
            }
          ]
        },
        {
          type: "steps",
          title: "Chamfers and Fillets",
          items: [
            {
              heading: "Standardize chamfer angles to 45 degrees",
              detail: "Chamfer tools are available in 60, 82, and 90 degree included angles (cutting at 30, 41, and 45 degrees from horizontal). A 45-degree chamfer (90-degree included angle tool) is the most common and available. Any non-standard chamfer angle requires surfacing with a ball end mill. A chamfer that runs continuously across multiple faces — including the corners where faces meet — also requires surfacing or simultaneous 5-axis machining, regardless of angle. Break continuous wrap-around chamfers into flat chamfers that stop at each edge."
            },
            {
              heading: "Distinguish between fillet types by axis orientation",
              detail: "Fillets whose axis is parallel to the spindle (the round corner at the bottom of a pocket wall, for example) can be cut in a single pass with a corner-radius end mill. Fillets whose axis is perpendicular to the spindle (like a rounded edge on the top face of a part) require 3D surfacing with a ball end mill and significantly more machine time. The DFM rule: fillets on pocket floors are cheap. Fillets on external edges visible from above are expensive. Use chamfers on external edges unless the fillet is structurally necessary."
            },
            {
              heading: "Add functional fillets at high-stress internal corners",
              detail: "Inside corners are stress concentrations. A sharp internal corner at the base of a wall can initiate cracks under cyclic loading. A fillet at an internal corner is structurally beneficial and also reduces tool stress during machining (smoother engagement). This is an exception to the general rule of minimizing features — internal fillets at high-stress locations are worth including, as long as the radius matches a standard tool size."
            }
          ]
        },
        {
          type: "steps",
          title: "Holes and Threads",
          items: [
            {
              heading: "Design hole diameters to standard drill sizes",
              detail: "Standard drill sizes exist in fractional inch (1/16, 5/64, 3/32... through 1 inch), letter sizes (A through Z), number sizes (1–80), and metric (1mm through 25mm in 0.5mm increments). A hole at a standard size is drilled — fast, cheap, accurate. A hole at a non-standard size is interpolated with an end mill — slower and more expensive. Exception: bores for precision fits (bearing housings, shaft journals) are typically bored or reamed regardless of size."
            },
            {
              heading: "Prefer through-tapped holes over blind-tapped holes",
              detail: "Tapping a blind hole (one that does not go all the way through the part) is riskier than tapping a through hole because the tap cannot exit the bottom of the hole. The tap can bottom out, jam, and break — and a broken tap in a tapped hole is very difficult to remove, often scrapping the part. If a blind tapped hole is necessary, always leave at least 2 thread-diameter of clearance at the bottom of the hole below the last engaged thread."
            },
            {
              heading: "Countersinks should match standard fastener angles",
              detail: "Flat-head screws typically require an 82-degree or 90-degree countersink (matching the screw head angle). These correspond to standard countersink tool angles. A non-standard countersink angle requires a non-standard tool or a surfacing operation."
            }
          ]
        },
        {
          type: "steps",
          title: "Tolerances and Surface Finish",
          items: [
            {
              heading: "Specify tolerances from function, not habit",
              detail: "Before adding a tolerance tighter than the default title block tolerance, ask: what happens to the assembly if this dimension is at the loose end of my tolerance? If the answer is nothing significant, the tight tolerance is not justified. Tolerance only what matters for function, and tolerance it at the loosest value that still allows function."
            },
            {
              heading: "Group toleranced features into the same setup",
              detail: "Features that have tight tolerances relative to each other should be machined in the same setup. Within a single setup, a CNC machine holds ±0.01mm or better. Across setups, the re-fixturing error of a standard vise is typically ±0.05–0.1mm. If you need two features within ±0.02mm of each other, they must be cut in the same setup — otherwise no amount of tight tolerancing on the drawing can compensate for the fixturing uncertainty."
            },
            {
              heading: "Apply surface finish callouts selectively",
              detail: "Only specify a surface finish tighter than the default (Ra 3.2 micrometers for standard milling) where there is a functional reason. Sealing faces (o-ring grooves, gasket surfaces) typically need Ra 1.6 or 0.8. Bearing bores may need Ra 0.4. Sliding contact surfaces depend on the application. Applying Ra 0.8 micrometers across an entire part when only one bore needs it multiplies finishing time for no benefit."
            }
          ]
        },
        {
          type: "callout",
          kind: "example",
          content: "<strong>Feature redesign example:</strong> An aluminum housing had a pocket 10mm wide and 55mm deep (5.5:1 ratio, borderline), 2mm corner radii (requires a 4mm end mill — the smallest practical at this depth), and Ra 0.8 micrometers finish on all surfaces. The redesign: widened the pocket to 14mm (allowing a 6mm end mill, bringing the ratio to 3.9:1 and tripling the material removal rate), increased corner radii to 3/16 inch (4.76mm, matching standard tooling exactly), and restricted the Ra 0.8 callout to the bore on the pocket floor only. Machining time for the pocket dropped by 65%. No functional change."
        },
        {
          type: "challenge",
          difficulty: "advanced",
          title: "Feature Audit",
          prompt: "Perform a complete feature-level DFM audit of the following part description. Identify every issue, explain the manufacturing consequence of each, and propose a specific fix.",
          context: "Part: 6061 aluminum pivot bracket, 3-axis machined. Features: two pockets on the top face — Pocket A is 12mm wide, 70mm deep, 2mm corner radii; Pocket B is 30mm wide, 25mm deep, 3mm corner radii; a 25mm diameter through-bore on the left side face (perpendicular to top face), toleranced ±0.005mm diameter; a continuous fillet running along all four external top edges, 4mm radius; a 35-degree chamfer around the bottom perimeter; four M6 tapped through-holes on the top face; surface finish Ra 1.6 micrometers on all faces.",
          tasks: [
            "List every DFM problem, targeting at least 6 distinct issues.",
            "For each, explain the specific manufacturing consequence.",
            "Propose a concrete fix for each issue.",
            "Estimate the relative cost reduction from your fixes (order of magnitude — 10%, 30%, 50%+?)."
          ],
          hint: "Go feature by feature using the guidelines in this section. Check: pocket ratios, corner radii vs. standard tools, the bore on the side face (how many setups?), the external fillets (what tool cuts them?), the chamfer angle, and the blanket surface finish callout.",
          answer: "<strong>Issue 1 — Pocket A depth-to-width ratio:</strong> 70mm / 12mm = 5.8:1. Requires extended-reach tooling. With a 12mm wide pocket, the largest possible tool is a 10mm (3/8 inch) end mill (with 4mm radii — see issue 2). Depth 70mm / 10mm diameter = 7:1 — beyond standard, requires special order tooling, slow feeds. Fix: widen Pocket A to at least 16mm, enabling a 1/2 inch (12.7mm) end mill with 6mm radii, giving a 70/12.7 = 5.5:1 ratio achievable with extended-reach standard tooling.<br><br><strong>Issue 2 — Pocket A corner radii:</strong> 2mm radius requires a 4mm end mill. This is extremely fragile at 70mm depth — certain breakage. Fix: same as above — widen pocket and use 4.76mm (3/16 inch) radii at minimum.<br><br><strong>Issue 3 — Pocket B corner radii:</strong> 3mm radius requires a 6mm (1/4 inch) end mill. Not a standard radius — 3.175mm (1/8 inch radius) is standard. The machinist will either use a slightly undersize tool (leaving excess material) or interpolate. Fix: change to 3.175mm (1/8 inch) or 4.76mm (3/16 inch) radius.<br><br><strong>Issue 4 — Side-face bore, 3rd setup:</strong> A through-bore on the left side face perpendicular to the top face cannot be machined in the same setup as the top face features. It requires a third setup (rotating the part 90 degrees). Additionally, the bore is toleranced ±0.005mm, which is a precision grinding level tolerance. At this tolerance, it must be in the same setup as its datum — but its datum is presumably the top face, which was machined in a different setup. Fix: if the bore tolerance is genuinely needed, add a precision reference feature (such as a dowel hole) that allows the Setup 3 program to re-establish position relative to the top-face datum. Also: confirm whether ±0.005mm is truly required — ±0.025mm would likely be achievable with a boring bar and is 5x easier.<br><br><strong>Issue 5 — Continuous external top-edge fillets:</strong> A 4mm fillet running along all four top edges requires 3D ball end mill surfacing around the full perimeter. This is slow and produces a scalloped finish. If the fillets are aesthetic, replace with 45-degree chamfers (one chamfer tool pass per edge, dramatically faster). If they are structural (stress relief), keep them but note the cost implication.<br><br><strong>Issue 6 — 35-degree chamfer:</strong> Standard chamfer tools are 60, 82, and 90 degree included angles. A 35-degree chamfer (from horizontal) has a 110-degree included angle — no standard tool. Requires ball end mill surfacing. Fix: change to 45 degrees (90-degree included angle tool, one fast pass).<br><br><strong>Issue 7 — Blanket Ra 1.6 micrometer finish:</strong> Ra 1.6 on all faces requires a careful finishing pass everywhere, significantly slowing machining. Fix: apply Ra 1.6 only to the bore and any sealing faces. Specify Ra 3.2 for all structural faces.<br><br><strong>Estimated cost reduction from all fixes: 40–55%</strong>, primarily driven by resolving the Pocket A depth-to-width ratio (longest machining operation), the surface finish callout (affects every face), and eliminating the ball end mill surfacing for fillets and chamfers."
        }
      ]
    },

    /* ══════════════════════════════════════════════════
       SECTION 7 — Vibration, Compliance, and Thin Features
    ══════════════════════════════════════════════════ */
    {
      title: "Vibration, Compliance, and Thin Features",
      blocks: [
        {
          type: "text",
          content: [
            "Cutting forces in machining are not steady — they are cyclic impulses at the tooth-pass frequency of the rotating tool. These impulses excite vibration in everything they contact: the tool, the spindle, the fixture, and the workpiece. Most of the time, the stiffness of each element damps this vibration quickly and it does not matter. But when the workpiece has thin features — thin walls, large unsupported membranes, cantilevered tabs — the natural frequency of those features can align with the excitation frequency, causing resonance. Resonance in machining produces a characteristic chattering sound, poor surface finish, dimensional error, and in extreme cases, part or tool breakage.",
            "Vibration risk is not purely about wall thickness. It is about local stiffness — which depends on the geometry, the material, and how the feature is supported. A 3mm wall that is 10mm tall and braced at both ends is far stiffer than a 3mm wall that is 50mm tall and unsupported. Building a mental model for this is more useful than memorizing minimum thickness rules."
          ]
        },
        {
          type: "keyterms",
          title: "Thin Feature Failure Modes",
          items: [
            {
              term: "Thin pocket floors (membrane vibration)",
              definition: "When a pocket is machined to leave a thin floor, that floor behaves like a drumhead — a membrane supported around its edges. The key variable is not just the thickness but the unsupported span in proportion to thickness. A 2mm floor spanning 5mm between supports is stiff. A 2mm floor spanning 80mm between supports will vibrate significantly under cutting. Avoid large unsupported areas at thin sections, or add structural ribs to reduce the unsupported span."
            },
            {
              term: "Thin webs (beam vibration)",
              definition: "Stiffening webs used in lightweight aerospace-style designs are susceptible to vibration when their section modulus drops too low. The stiffness of a beam in bending scales with the cube of its thickness — halving the web thickness reduces bending stiffness by 8x. Design webs with a height-to-thickness ratio that preserves adequate bending stiffness, and add intermediate support features (bosses, ribs crossing the web) if the web must be tall and thin."
            },
            {
              term: "Cantilevered features (cantilever vibration)",
              definition: "Tabs, snap fits, and protruding bosses that are fixed at one end and free at the other are cantilevered beams. A cantilever is significantly less stiff than a simply-supported beam of the same dimensions — about 4x less stiff in deflection. Cantilevered features are vibration-prone during machining and also prone to workholding-induced deformation (the vise clamps and the feature bends). Design tabs with appropriate width-to-height ratios, and try to ensure they are machined after the surrounding structure has been established."
            },
            {
              term: "Part compliance under clamping",
              definition: "A part that flexes under vise clamping loads is just as problematic as one that vibrates during cutting. When a part is clamped and then machined, it is being held in a deflected state. When released from the vise, it springs back — and the machined geometry moves with it. This causes systematic dimensional errors that are hard to predict without understanding the deflection. The practical rule: design parts to be stiff enough to be clamped hard without significant deflection, especially in the second and later operations where walls have become thin."
            }
          ]
        },
        {
          type: "callout",
          kind: "warning",
          content: "Machinists can compensate for vibration by reducing cutting speeds and feed rates. This always increases cost. It is much harder to compensate for dimensional errors caused by part compliance — those often result in scrapped parts. If your part design creates a compliance problem, expect either significant cost increases or parts that fail inspection."
        },
        {
          type: "text",
          content: [
            "Warping from internal stress is a related failure mode that affects parts with asymmetric geometry and large material removal. Raw stock — particularly extruded aluminum bar — arrives with a non-uniform internal stress state: tensile stress at the surface, compressive stress in the core. When machining removes material from one side of the part, it also removes the stressed material on that side. The stress state is now unbalanced, and the part warps to relieve it.",
            "This is most severe in parts that remove a large fraction of the stock material asymmetrically — a thin plate machined from a thick bar, or a part with pockets only on one face. Machinists can mitigate this by balancing the part within the stock, rough machining both sides before finishing either, or choosing material that has been stress-relieved. As a designer, you cannot always prevent this, but you should be aware that asymmetric, high-stock-removal designs carry warping risk and plan for it in your tolerancing."
          ]
        },
        {
          type: "checklist",
          title: "Vibration and Compliance Design Checklist",
          items: [
            { type: "do",   text: "Consider the stiffness of the part at the point of each secondary operation, after material has been removed" },
            { type: "do",   text: "For thin-floor pockets, check the unsupported span-to-thickness ratio, not just the floor thickness" },
            { type: "do",   text: "Add stiffening ribs across thin webs or large unsupported areas where vibration is a risk" },
            { type: "do",   text: "Design parts with parallel flat reference surfaces that can be firmly clamped in a vise" },
            { type: "do",   text: "For high-stock-removal asymmetric parts, discuss stress-relief heat treatment with your supplier" },
            { type: "dont", text: "Don't design cantilevered features that will be machined before surrounding structure is established" },
            { type: "dont", text: "Don't specify tight tolerances on features that are adjacent to compliant thin-wall geometry" },
            { type: "dont", text: "Don't assume that a part that looks stiff in CAD will behave stiffly once half its material has been removed" }
          ]
        },
        {
          type: "challenge",
          difficulty: "advanced",
          title: "Stiffness and Vibration Assessment",
          prompt: "An H-beam aluminum bracket is designed for an aircraft hydraulic system mount. The part has two flanges (each 80mm wide, 4mm thick) connected by a central web (60mm tall, 3mm thick). Lightening holes are machined through each flange, perpendicular to the flange faces. The web has two additional lightening holes. After the first machining operation (external profile and flange faces), the part looks like a finished H-beam. The second operation machines the lightening holes.",
          context: "The bracket is held for the second operation by clamping across the two flanges in a vise. The central web is between the vise jaws, unsupported. The finished-wall thickness of the web is 3mm. The web is 60mm tall. The bracket is 100mm long.",
          tasks: [
            "Identify at least three vibration or compliance risks in this design and second-operation setup.",
            "The web is 3mm thick and 60mm tall, spanning 100mm in length. Qualitatively describe how this compares to a well-supported web from a stiffness standpoint.",
            "Propose two design changes that would reduce the vibration risk without significantly changing the structural efficiency of the H-beam.",
            "The lightening holes in the flanges are described as perpendicular to the flange faces. What setup challenge does this create, and how would you solve it?"
          ],
          hint: "Think about the web as a thin rectangular plate supported on its bottom and top edges (the flanges) but free on the two short ends. What is the unsupported span? Now think about the vise clamping — where is the force applied, and where is the web relative to those forces?",
          answer: "<strong>Risk 1 — Web membrane/beam vibration:</strong> The web is 3mm thick, 60mm tall, 100mm long. When clamped by the flanges, the web is essentially a thin plate supported on two long edges (top and bottom, at the flange connections) but unsupported on the two short ends. The unsupported span is 100mm. A 3mm plate spanning 100mm with only edge support will have very low natural frequency and will vibrate significantly during the drilling/boring of the lightening holes — particularly when the drill breaks through and cutting forces become impulsive.<br><br><strong>Risk 2 — Flange compliance under clamping:</strong> The flanges are 4mm thick and 80mm wide. Clamping across both flanges to hold the part for the second operation applies load at the flange outer surfaces. The flange will flex inward under clamping load. When the clamp releases, it springs back. Any holes bored in the flanges while they are deflected will be in the wrong position relative to each other when released.<br><br><strong>Risk 3 — Web deformation from clamping-induced flange bending:</strong> As the flanges bend inward under clamping, they drag the web with them. A 3mm web will deform significantly. If the web lightening holes are bored in this state, their position relative to the flanges will be off after release.<br><br><strong>Web stiffness assessment:</strong> The web is very poorly supported. The bending stiffness of a plate scales with the cube of thickness — 3mm is 8x less stiff than 6mm. With a 100mm free span and no intermediate support, this web will deflect measurably under finger pressure, let alone cutting forces. Compare to a well-supported web of the same dimensions braced at 25mm intervals — that would be 16x stiffer in bending.<br><br><strong>Design changes:</strong> (1) Add cross-ribs connecting the two flanges through the web at quarter-points (25mm from each end). This reduces the unsupported web span from 100mm to approximately 25mm, increasing plate stiffness by roughly 16x. The ribs add minimal mass and do not impair structural efficiency. (2) Increase web thickness to 5mm in the areas between lightening holes. This provides 5x more bending stiffness per unit width at the cost of modest mass increase.<br><br><strong>Flange hole setup challenge:</strong> Holes perpendicular to the flange faces are cut pointing horizontally — not accessible from above in a standard vertical mill setup. This requires either tilting the part 90 degrees (a separate setup for each flange, potentially 2 more setups), using a 3+2 approach on a 5-axis machine, or redesigning the holes to be vertical (coaxial with the spindle). The redesign is the simplest solution: if the holes are lightening holes, their orientation is not functionally critical. Change them to vertical (drilled from above) and all flange holes can be machined in Setup 1 along with the external profile — eliminating the need for additional setups entirely."
        }
      ]
    },

    /* ══════════════════════════════════════════════════
       SECTION 8 — Putting It All Together
    ══════════════════════════════════════════════════ */
    {
      title: "Putting It All Together: The DFM Review",
      blocks: [
        {
          type: "text",
          content: [
            "DFM is most powerful when it is applied continuously throughout a design — not as a single review at the end. Each time you add a feature in CAD, the most efficient DFM habit is to immediately ask: what tool cuts this, from which direction, held how, at what cost? Catching a non-standard corner radius at the moment of modeling takes 10 seconds. Catching it after the drawing has been sent to a shop, quoted, and returned with a surprise cost takes a day and a redesign.",
            "That said, a structured pre-release DFM review is still essential. Even experienced engineers miss things. A checklist-based review against the principles in this module — done before any drawing is released — consistently finds issues that reduce cost and improve manufacturability."
          ]
        },
        {
          type: "steps",
          title: "The DFM Review Process",
          items: [
            {
              heading: "Review for setup count and accessibility",
              detail: "Examine every feature and ask which direction it is cut from. Group features by access direction. Determine the minimum number of setups. Ask: can any features be reoriented to consolidate setups? Can the part be redesigned so all features come from two opposing faces (enabling a double-vise setup)?"
            },
            {
              heading: "Audit every pocket, slot, and hole against tooling rules",
              detail: "For each pocket: find the constraining radius, identify the largest standard end mill that fits, check the depth-to-diameter ratio against the 4:1 / 6:1 / 10:1 thresholds. For each hole: verify it is a standard drill size. For each slot: check if a slitting saw could replace an end mill for deep or narrow features."
            },
            {
              heading: "Check every chamfer and fillet",
              detail: "Chamfers: are they all 45-degree (or another standard tool angle)? Do any chamfers wrap continuously across face junctions — which requires surfacing? Fillets: are they on pocket floors (cheap) or external edges (expensive)? Are the radii standard tool sizes? Can external fillets be replaced with chamfers?"
            },
            {
              heading: "Review all tolerances",
              detail: "For each tolerance tighter than the title block default: what is the functional reason? What is the loosest value that still allows function? Is the toleranced feature in the same setup as its datum? Is the tolerance achievable by the intended process, or does it require a secondary operation (grinding, honing)?"
            },
            {
              heading: "Assess compliance and vibration risk",
              detail: "Identify the thinnest features. Ask: how stiff is the part at the point of each secondary operation? Are there large unsupported membranes or thin cantilevered features? Are any tight tolerances adjacent to potentially compliant geometry? Is the part asymmetric with high material removal (warping risk)?"
            },
            {
              heading: "Check surface finish callouts",
              detail: "Is the surface finish callout applied selectively or globally? For every face with a tight finish callout: what is the functional reason? Remove all blanket finish callouts and replace with specific callouts only on faces that need them."
            }
          ]
        },
        {
          type: "checklist",
          title: "Final Pre-Release DFM Checklist",
          items: [
            { type: "do", text: "All inside pocket corner radii match a standard end mill size" },
            { type: "do", text: "All pocket depth-to-width ratios are at or below 6:1 (flag anything above 4:1 for discussion)" },
            { type: "do", text: "All features are accessible from a defined, minimum set of machining setups" },
            { type: "do", text: "All chamfers are at standard angles (45 degrees preferred) and do not wrap continuously across face junctions" },
            { type: "do", text: "All hole diameters are standard drill sizes or explicitly specified for boring/reaming" },
            { type: "do", text: "All tolerances have a documented functional reason and are the loosest value that allows function" },
            { type: "do", text: "Toleranced features that reference each other are machined in the same setup" },
            { type: "do", text: "Surface finish callouts are applied only to faces where a functional reason exists" },
            { type: "do", text: "Material and alloy designation are explicitly called out on the drawing" },
            { type: "do", text: "Part stiffness has been considered at the point of each secondary operation" },
            { type: "dont", text: "Do not apply blanket tight tolerances or surface finishes — specify only what function requires" },
            { type: "dont", text: "Do not release a drawing without identifying which setup machines each feature" },
            { type: "dont", text: "Do not use non-standard corner radii, chamfer angles, or hole sizes without explicit reason" },
            { type: "dont", text: "Do not specify tolerances tighter than ±0.025mm without confirming the shop can hold them" }
          ]
        },
        {
          type: "callout",
          kind: "tip",
          content: "The best DFM investment you can make early in your career is to visit a machine shop and watch parts being made. Seeing a machinist struggle to fixture a part you designed, or watching a tool break in a pocket that was too deep, builds intuition that no amount of reading can fully replace. If you have any access to a shop — school, team, employer — spend time there."
        },
        {
          type: "challenge",
          difficulty: "advanced",
          title: "Complete DFM Review",
          prompt: "You are doing a pre-release DFM review on the following part. Apply everything from this module — machine and setup analysis, tooling, workholding, cost drivers, feature guidelines, vibration/compliance — and produce a complete DFM report.",
          context: "Part: 7075-T6 aluminum drone arm, CNC 3-axis machined. Dimensions: 300mm long, 40mm wide, 25mm tall. Features: (1) External profile is a constant cross-section with a 3mm radius on all four external lengthwise edges. (2) Two large pockets on the top face, each 20mm wide, 22mm deep, 1.5mm corner radii. (3) Motor mount face on one end — a flat face perpendicular to the arm length, with four M3 tapped blind holes, 8mm deep. (4) A 10mm diameter bore through the arm width (perpendicular to top face), located 30mm from the motor mount end, toleranced ±0.01mm diameter and ±0.02mm position. (5) Surface finish Ra 0.8 micrometers everywhere. (6) All tolerances ±0.025mm (title block). Drawing has a single datum: the bottom face.",
          tasks: [
            "Identify the minimum number of setups and describe what is machined in each.",
            "List every DFM problem you find — target at least 7 distinct issues.",
            "For each issue, explain the manufacturing consequence and propose a fix.",
            "Identify any issues with the datum scheme.",
            "Estimate the cost reduction potential from your recommended changes."
          ],
          hint: "Work systematically: (1) setup/access analysis first, (2) feature by feature against tooling rules, (3) tolerances and their setup requirements, (4) surface finish, (5) compliance/vibration given the pocket geometry, (6) datum scheme. For the datum scheme, think about what the motor mount interface actually cares about.",
          answer: "<strong>Setup Analysis — minimum 3 setups:</strong> Setup 1: part lying flat, top face up — machine the two pockets and the top-face edge fillets. Setup 2: part flipped, bottom face up — nothing to machine here unless the bottom needs facing. Setup 3: part rotated 90 degrees, motor mount face up — machine the motor mount face flat and drill/tap the four M3 holes. The 10mm bore is perpendicular to the top face so it can be drilled from above in Setup 1. But note: this makes 3 setups minimum. Could the motor mount holes be made accessible from the top? If the mount holes were on the top face (re-orienting the motor), setup count drops to 2.<br><br><strong>DFM Issues:</strong><br><br><strong>Issue 1 — Pocket corner radii at 1.5mm:</strong> Requires a 3mm (1/8 inch) end mill. Depth 22mm / 3mm = 7.3:1 ratio — above the 6:1 standard limit, requires extended-reach tooling. A 3mm end mill at 7:1 depth is fragile and slow. Fix: increase corner radii to 3/16 inch (4.76mm), allowing a 3/8 inch (9.53mm) end mill. New ratio: 22/9.53 = 2.3:1 — completely standard.<br><br><strong>Issue 2 — Pocket depth-to-width ratio:</strong> Even with larger corner radii, check against pocket width. Pocket is 20mm wide, so largest tool that fits with 4.76mm radii is a 3/8 inch end mill. Ratio 22/9.53 = 2.3:1 — acceptable once radii are fixed.<br><br><strong>Issue 3 — External edge fillets:</strong> 3mm radius on all four external lengthwise edges requires 3D ball end mill surfacing along 300mm of profile — four times. This is very slow. Replace with 45-degree chamfers unless the fillets are required for aerodynamic or structural reasons.<br><br><strong>Issue 4 — Bore tolerance ±0.01mm diameter, ±0.02mm position:</strong> ±0.01mm on a 10mm bore is a precision grinding/honing tolerance. Standard boring holds ±0.025mm. This requires a secondary honing or grinding operation, adding significant cost and lead time. ±0.02mm position is similarly tight. Fix: confirm what goes in this bore. If it is a bearing press fit, ±0.013mm on diameter may be required — but ±0.01mm is tighter than necessary for any standard bearing. Relax to ±0.025mm for the bore diameter and ±0.05mm for position unless there is a specific reason. Also: the bore is in the same part as the motor mount holes. If the bore position is critical relative to the mount pattern, both must be in the same setup — currently they are in different setups (bore in Setup 1, motor mount in Setup 3). Either redesign to consolidate, or add a datum transfer feature.<br><br><strong>Issue 5 — Ra 0.8 micrometers everywhere:</strong> Applying Ra 0.8 to a 300mm-long part's entire surface multiplies finishing time enormously. Ra 0.8 should only apply to the precision bore (if it is a bearing surface) and any sealing faces. Fix: Ra 3.2 micrometers as default; Ra 0.8 on bore only.<br><br><strong>Issue 6 — Title block ±0.025mm:</strong> A title block tolerance of ±0.025mm applied to every untoleranced dimension is extremely tight and will significantly increase inspection cost and machine time. Standard title block is ±0.1mm or ±0.5mm for non-critical features. Fix: change title block to ±0.1mm and apply explicit tighter tolerances only where function demands it.<br><br><strong>Issue 7 — 7075-T6 material:</strong> 7075 machines well but is significantly harder and more expensive than 6061. For a drone arm where light weight and stiffness are critical, 7075 may be justified (it has ~35% higher yield strength than 6061). However, verify that the arm is actually strength-limited rather than stiffness-limited. If stiffness governs (deflection of the arm under motor thrust), 6061 is nearly as good and significantly cheaper to machine.<br><br><strong>Issue 8 — Datum scheme:</strong> A single datum (bottom face) is insufficient for a part with positionally toleranced features. The bottom face constrains only one translational degree of freedom (height). The bore position tolerance of ±0.02mm needs to reference a complete datum reference frame — at minimum the bottom face (A), one end face (B), and one side face (C). The motor mount hole pattern similarly needs a complete DRF. The current single-datum scheme means the positional tolerance on the bore is ambiguous — ambiguous tolerances cause expensive disagreements between designer and inspector.<br><br><strong>Estimated cost reduction: 50–65%</strong>, driven primarily by: fixing pocket corner radii (enables 4x larger tool, dramatically faster MRR), removing the blanket Ra 0.8 finish (reduces finishing time across the entire part), relaxing the title block tolerance (reduces inspection burden), and replacing external edge fillets with chamfers (eliminates ball end mill surfacing passes on all four edges over 300mm length)."
        }
      ]
    }

  ] // end sections
};

// Hand off to the renderer
document.addEventListener('DOMContentLoaded', function() { renderModulePage(MODULE_CONTENT); });