import {Box, Grid, Stack, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {useEffect} from "react";
import {selectProfile} from "../../../store/selectors/profileSelectors";
import {fetchTracks} from "../../../services/musicApiClient";
import {YandexMusicIconProvider} from "../../widgets/YandexMusicIconProvider";

export const TracksCard = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.profile.loading);
    const error = useAppSelector((state) => state.profile.error);
    const profile = useAppSelector(selectProfile);

    useEffect(() => {
        dispatch(fetchTracks());
    }, [dispatch]);

    if (loading) return <div>Загрузка логинов...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Музыка
            </Typography>
            <Stack spacing={1.5}>
                {profile.tracks.map((entity) => (
                    <Stack
                        key={entity.id}
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="space-between"
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                        sx={{
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: 2,
                            p: 1.5,
                            gap: 1.5
                        }}
                    >
                        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 1.5,
                                    bgcolor: 'rgba(255,255,255,0.03)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}
                            >
                                <YandexMusicIconProvider url={entity.coverUrl} sx={{ fontSize: 24 }} />
                            </Box>
                            <Stack spacing={0.5} sx={{ minWidth: 0 }}>
                                <Typography variant="subtitle2" sx={{ wordBreak: 'break-word' }}>
                                    {entity.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {entity.artistName}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                ))}
            </Stack>
        </Grid>
    );
};