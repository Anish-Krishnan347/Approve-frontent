"use client";

import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Card,
  Chip,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
  alpha,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  SearchRounded,
  SendRounded,
  AttachFileRounded,
  ArrowBackRounded,
  MoreVertRounded,
} from "@mui/icons-material";
import { conversations as initialConversations } from "../../Components/DefaultValues/chatdatas";

const initials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const ChatView = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [conversations, setConversations] =
    React.useState(initialConversations);
  const [selectedId, setSelectedId] = React.useState(
    initialConversations[0]?.id,
  );
  const [search, setSearch] = React.useState("");
  const [draft, setDraft] = React.useState("");
  const scrollRef = React.useRef(null);

  const selected = conversations.find((c) => c.id === selectedId);

  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  React.useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [selected?.messages?.length, selectedId]);

  const handleSelect = (id) => {
    setSelectedId(id);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)),
    );
  };

  const handleSend = () => {
    if (!draft.trim() || !selected) return;
    const newMessage = {
      id: Date.now(),
      sender: "me",
      text: draft.trim(),
      time: "Just now",
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selected.id
          ? {
              ...c,
              messages: [...c.messages, newMessage],
              lastMessage: newMessage.text,
              lastMessageTime: "Just now",
            }
          : c,
      ),
    );
    setDraft("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showList = !isMobile || !selectedId;
  const showChat = !isMobile || !!selectedId;

  return (
    <Box
      sx={{
        // maxWidth: 1200,
        mx: "auto",
        height: "calc(100vh - 142px)",
        minHeight: 480,
      }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          overflow: "hidden",
          p: 0,
        }}
      >
        {/* User list */}
        {showList && (
          <Box
            sx={{
              width: { xs: "100%", md: 320 },
              flexShrink: 0,
              borderRight: { md: `1px solid ${theme.palette.divider}` },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ p: 2.5, pb: 1.5 }}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Messages
              </Typography>
              <TextField
                fullWidth
                placeholder="Search people..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRounded
                        fontSize="small"
                        sx={{ color: "text.secondary" }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ flexGrow: 1, overflowY: "auto", px: 1, pb: 1 }}>
              {filtered.map((c) => {
                const isSelected = c.id === selectedId;
                return (
                  <Box
                    key={c.id}
                    onClick={() => handleSelect(c.id)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1.25,
                      mb: 0.5,
                      borderRadius: 2.5,
                      cursor: "pointer",
                      backgroundColor: isSelected
                        ? alpha(
                            theme.palette.primary.main,
                            isDark ? 0.18 : 0.08,
                          )
                        : "transparent",
                      "&:hover": {
                        backgroundColor: isSelected
                          ? alpha(
                              theme.palette.primary.main,
                              isDark ? 0.22 : 0.1,
                            )
                          : "action.hover",
                      },
                      transition: "background-color 0.15s ease",
                    }}
                  >
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                      sx={{
                        "& .MuiBadge-badge": {
                          backgroundColor: c.online
                            ? "success.main"
                            : "text.disabled",
                          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 44,
                          height: 44,
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        }}
                      >
                        {initials(c.name)}
                      </Avatar>
                    </Badge>

                    <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography
                          variant="body2"
                          noWrap
                          sx={{ fontWeight: 700 }}
                        >
                          {c.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ flexShrink: 0, ml: 1 }}
                        >
                          {c.lastMessageTime}
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                          sx={{
                            maxWidth: 190,
                            fontWeight: c.unread ? 600 : 400,
                          }}
                        >
                          {c.lastMessage}
                        </Typography>
                        {c.unread > 0 && (
                          <Chip
                            label={c.unread}
                            size="small"
                            color="primary"
                            sx={{
                              height: 18,
                              minWidth: 18,
                              fontSize: "0.65rem",
                              "& .MuiChip-label": { px: 0.6 },
                            }}
                          />
                        )}
                      </Stack>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}

        {/* Chat panel */}
        {showChat && (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
            }}
          >
            {selected ? (
              <>
                {/* Header */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  sx={{
                    px: 2.5,
                    py: 1.75,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  {isMobile && (
                    <IconButton
                      size="small"
                      onClick={() => setSelectedId(null)}
                    >
                      <ArrowBackRounded fontSize="small" />
                    </IconButton>
                  )}
                  <Avatar
                    sx={{
                      width: 38,
                      height: 38,
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    }}
                  >
                    {initials(selected.name)}
                  </Avatar>
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2" noWrap>
                      {selected.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color={
                        selected.online ? "success.main" : "text.secondary"
                      }
                    >
                      {selected.online ? "Online" : selected.role}
                    </Typography>
                  </Box>
                  <Tooltip title="More options">
                    <IconButton size="small">
                      <MoreVertRounded fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>

                {/* Messages */}
                <Box
                  ref={scrollRef}
                  sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    px: 2.5,
                    py: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.25,
                    backgroundImage: isDark
                      ? "radial-gradient(circle at 100% 0%, rgba(99,102,241,0.06) 0%, rgba(99,102,241,0) 40%)"
                      : "radial-gradient(circle at 100% 0%, rgba(67,56,163,0.04) 0%, rgba(67,56,163,0) 40%)",
                  }}
                >
                  {selected.messages.map((m) => {
                    const isMe = m.sender === "me";
                    return (
                      <Box
                        key={m.id}
                        sx={{
                          alignSelf: isMe ? "flex-end" : "flex-start",
                          maxWidth: "70%",
                        }}
                      >
                        <Box
                          sx={{
                            px: 1.75,
                            py: 1,
                            borderRadius: isMe
                              ? "16px 16px 4px 16px"
                              : "16px 16px 16px 4px",
                            backgroundImage: isMe
                              ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
                              : "none",
                            backgroundColor: isMe
                              ? undefined
                              : "background.default",
                            color: isMe
                              ? theme.palette.primary.contrastText
                              : "text.primary",
                            border: isMe
                              ? "none"
                              : `1px solid ${theme.palette.divider}`,
                          }}
                        >
                          <Typography variant="body2">{m.text}</Typography>
                        </Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            display: "block",
                            mt: 0.4,
                            textAlign: isMe ? "right" : "left",
                          }}
                        >
                          {m.time}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>

                {/* Composer */}
                <Stack
                  direction="row"
                  alignItems="flex-end"
                  spacing={1}
                  sx={{
                    p: 2,
                    borderTop: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Tooltip title="Attach file">
                    <IconButton sx={{ color: "text.secondary" }}>
                      <AttachFileRounded fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    placeholder="Type a message..."
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <IconButton
                    onClick={handleSend}
                    disabled={!draft.trim()}
                    sx={{
                      color: "#fff",
                      backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      "&:hover": { filter: "brightness(1.05)" },
                      "&.Mui-disabled": {
                        backgroundImage: "none",
                        backgroundColor: alpha(
                          theme.palette.text.disabled,
                          0.2,
                        ),
                        color: "text.disabled",
                      },
                    }}
                  >
                    <SendRounded fontSize="small" />
                  </IconButton>
                </Stack>
              </>
            ) : (
              <Box sx={{ flexGrow: 1, display: "grid", placeItems: "center" }}>
                <Typography color="text.secondary">
                  Select a conversation to start chatting
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default ChatView;
