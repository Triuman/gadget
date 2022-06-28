import ContextConsumer, { WithContext } from '../abstracts/ContextConsumer';
import {
	TextureCompareFunc,
	TextureCompareMode,
	TextureMagFilter,
	TextureMinFilter,
	TextureWrap,
} from './textureEnums';


export interface SamplerProps extends WithContext {
	/**
	 * The texture minification filter.
	 *
	 * @defaultValue {@linkcode TextureMinFilter.linear}
	 */
	minFilter?: TextureMinFilter,

	/**
	 * The texture magnification filter.
	 *
	 * @defaultValue {@linkcode TextureMagFilter.linear}
	 */
	magFilter?: TextureMagFilter,

	/**
	 * Texture wrapping mode for the `s`/`x` coordinate.
	 *
	 * @defaultValue {@linkcode TextureWrap.clampToEdge}
	 */
	wrapS?: TextureWrap,

	/**
	 * Texture wrapping mode for the `t`/`y` coordinate.
	 *
	 * @defaultValue {@linkcode TextureWrap.clampToEdge}
	 */
	wrapT?: TextureWrap,

	/**
	 * Texture wrapping mode for the `r`/`z` coordinate.
	 *
	 * @defaultValue {@linkcode TextureWrap.clampToEdge}
	 */
	wrapR?: TextureWrap,

	/**
	 * The minimum level-of-detail.
	 *
	 * @defaultValue -1000
	 */
	minLod?: number,

	/**
	 * The maximum level-of-detail.
	 *
	 * @defaultValue 1000
	 */
	maxLod?: number,

	/**
	 * The texture comparison mode.
	 *
	 * @defaultValue {@linkcode TextureCompareMode.none}
	 */
	compareMode?: TextureCompareMode,

	/**
	 * The texture comparison function.
	 *
	 * @defaultValue {@linkcode TextureCompareFunc.lessOrEqual}
	 */
	compareFunc?: TextureCompareFunc,
}


/**
 * A Sampler storing sampling parameters for texture access.
 */
export default class Sampler extends ContextConsumer {
	private sampler: WebGLSampler;


	public constructor( {
		context,
		minFilter = TextureMinFilter.linear,
		magFilter = TextureMagFilter.linear,
		wrapS = TextureWrap.clampToEdge,
		wrapT = TextureWrap.clampToEdge,
		wrapR = TextureWrap.clampToEdge,
		minLod = -1000,
		maxLod = 1000,
		compareMode = TextureCompareMode.none,
		compareFunc = TextureCompareFunc.lessOrEqual,
	}: SamplerProps = {} ) {
		super(
			async () => {
				const { gl } = this;
				const sampler = gl.createSampler();

				gl.samplerParameteri( sampler, gl.TEXTURE_MIN_FILTER, minFilter );
				gl.samplerParameteri( sampler, gl.TEXTURE_MAG_FILTER, magFilter );
				gl.samplerParameteri( sampler, gl.TEXTURE_WRAP_S, wrapS );
				gl.samplerParameteri( sampler, gl.TEXTURE_WRAP_T, wrapT );
				gl.samplerParameteri( sampler, gl.TEXTURE_WRAP_R, wrapR );
				gl.samplerParameterf( sampler, gl.TEXTURE_MIN_LOD, minLod );
				gl.samplerParameterf( sampler, gl.TEXTURE_MAX_LOD, maxLod );
				gl.samplerParameteri( sampler, gl.TEXTURE_COMPARE_MODE, compareMode );
				gl.samplerParameteri( sampler, gl.TEXTURE_COMPARE_FUNC, compareFunc );

				this.sampler = sampler;
			},
			context,
		);
	}


	/**
	 * Returns the underlying `WebGLSampler` object once ready.
	 *
	 * @returns The underlying `WebGLSampler` object.
	 */
	public async getSampler(): Promise<WebGLSampler> {
		await this.ready;

		return this.sampler;
	}


	/**
	 * Flags the underlying sampler for deletion.
	 */
	public async delete(): Promise<void> {
		await this.ready;

		const { gl, sampler } = this;

		gl.deleteSampler( sampler );
	}
}