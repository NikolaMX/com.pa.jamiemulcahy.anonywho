# Anonywho - Planetary Annihilation Anonymous Mode Mod

A modern anonymity mod for Planetary Annihilation: Titans that combines and improves upon the features of two existing mods.

## Project Overview

This mod merges the best features of:
- **Masquerade** (`com.pa.n30n.masquerade`) - Random colors, chat anonymization, faction-based commander selection
- **Anonymous Army Mod** (`net.teamfruit.pa.anonymous-mod`) - Animal aliases, color hiding, devmode anonymization

### Goals

Create a unified anonymity solution that:
1. Works well in both FFA and team games
2. Fixes information leaks present in both original mods
3. Supports all factions including Exiles (where commanders have different stats)
4. Allows secret commander selection while hiding choices from other players

## Technical Context

### Game Architecture
- **UI Framework:** HTML, CSS, ES5 JavaScript
- **Data Binding:** KnockoutJS
- **Utilities:** Underscore.js, jQuery
- **Mod System:** Mods declare scenes they hook and shadow/extend game files
- **File Protocol:** `coui://` for game resources

### Mod Structure
```
mod-folder/
  modinfo.json          # Mod metadata, dependencies, scene declarations
  ui/
    mods/
      mod.identifier/
        scene_name.js   # JavaScript extensions
        scene_name.css  # Style overrides
```

## Feature Requirements

### Must Have (Minimal Viable)
- [ ] Hide player names (use animal aliases like AAM)
- [ ] Anonymize chat messages (prevent name leaks)
- [ ] Anonymize system alerts (disconnect/reconnect)
- [ ] Work with any faction/commander

### Should Have (Ideal)
- [ ] Randomize colors (like Masquerade) OR hide colors (like AAM)
- [ ] Secret commander selection - only you see your choice
- [ ] Anonymize devmode/sandbox viewer (like AAM)
- [ ] Shuffle player display order

### Design Decisions Needed
1. **Color handling:** Randomize to distinct colors (Masquerade style) or hide to white (AAM style)?
2. **Commander selection:** Allow free choice but hide from others, or force random selection?
3. **Spectator visibility:** Should spectators see real names + aliases (AAM style) or stay anonymous?

## Known Information Leaks to Fix

Both mods leak information via:
1. System alerts for player disconnect/reconnect
2. Chat messages (Masquerade fixes this, AAM does not)
3. Devmode sandbox viewer (AAM fixes this, Masquerade does not)
4. Commander selection visibility (neither mod fully solves this)

## Reference Materials

Located in `reference/` (gitignored):
- `com.pa.n30n.masquerade/` - Full Masquerade mod source
- `net.teamfruit.pa.anonymous-mod/` - Full AAM source
- `Planetary Annihilation Titans/` - Game UI source

Each reference mod folder has its own CLAUDE.md with detailed analysis.

## Development Notes

- Avoid headless servers for testing - they can break lobby mods
- Test with multiple clients to verify anonymization
- The broken commander `raptor_xov` should be excluded (Linux client issues)
- Watch for Legion expansion compatibility
